import React from "react"
import { UserInfoAndUserStatus, Session, User } from "../types/neos"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material"
import neosActions from "../redux/neos/actions"
import DeleteIcon from "@mui/icons-material/Delete"

const UserStatus: React.FC<{ user: UserInfoAndUserStatus }> = ({ user }) => {
  const dispatch = useDispatch()

  let color = "gray"
  switch (user.status?.onlineStatus) {
  case "Offline":
    color = "gray"
    break
  case "Invisible":
    color = "black"
    break
  case "Away":
    color = "orange"
    break
  case "Busy":
    color = "red"
    break
  case "Online":
    color = "green"
    break
  }

  const handleDeleteUser = () =>
    dispatch(neosActions.deleteUserByIdActionCreator(user.userInfo.id))

  return (
    <Card
      className="user-status-show"
      sx={{
        width: 300,
        height: 300,
        margin: "4px",
        overflow: "scroll",
      }}
    >
      <CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "gray" }} aria-label="recipe">
              {user.userInfo.username[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="delete">
              <DeleteIcon color="warning" onClick={handleDeleteUser} />
            </IconButton>
          }
          title={user.userInfo.username}
          subheader={
            user.userInfo.id.length > 20
              ? user.userInfo.id.slice(0, 19) + "…"
              : user.userInfo.id
          }
          style={{
            padding: "0px 3px",
            textAlign: "left",
          }}
        />
        <Chip
          label={user.status?.onlineStatus}
          variant={"outlined"}
          sx={{
            color: color,
            padding: "15px",
            margin: "8px",
          }}
        />
        <List>
          {user.status?.activeSessions &&
            user.status?.activeSessions.map((session: Session) => {
              const color =
                session.sessionId === user.status?.currentSessionId
                  ? "#dfd"
                  : "#fff"
              return (
                <ListItem
                  key={session.sessionId + user.userInfo.id}
                  disablePadding
                  sx={{
                    backgroundColor: color,
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      dispatch(
                        neosActions.sessionModalOpenActionCreator(
                          session.sessionId,
                          user.userInfo.id
                        )
                      )
                    }}
                  >
                    {session.name}
                  </ListItemButton>
                </ListItem>
              )
            })}
        </List>
        {user.status?.onlineStatus === "Offline" && (
          <Typography sx={{ fontSize: 12 }}>
            {"最終オンライン: " +
              new Date(user.status?.lastStatusChange).toLocaleString("ja-JP")}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

function sortByLastStatus(
  a: UserInfoAndUserStatus,
  b: UserInfoAndUserStatus
): number {
  const statusPriority: { [key: string]: number } = {
    Online: 0,
    Away: 1,
    Busy: 2,
    Invisible: 3,
    Offline: 4,
  }

  // statusがnullまたはundefinedの場合は、Offlineとみなす
  const aStatus = a.status?.onlineStatus || "Offline"
  const bStatus = b.status?.onlineStatus || "Offline"

  const aPriority = statusPriority[aStatus]
  const bPriority = statusPriority[bStatus]
  if (aPriority < bPriority) {
    return -1
  } else if (aPriority > bPriority) {
    return 1
  } else {
    // onlineStatusが同じ場合、lastStatusChangeで並べ替える
    const aDate = new Date(a.status?.lastStatusChange || "")
    const bDate = new Date(b.status?.lastStatusChange || "")

    if (aDate < bDate) {
      return 1
    } else if (aDate > bDate) {
      return -1
    } else {
      return 0
    }
  }
}

type UserListProps = {
  users: UserInfoAndUserStatus[];
};

const UserList: React.FC<UserListProps> = React.memo(
  ({ users }: UserListProps) => {
    return (
      <>
        <div id={"user-list"}>
          <Grid container alignItems={"center"} justifyContent="center">
            {users.sort(sortByLastStatus).map((user: UserInfoAndUserStatus) => {
              return (
                <Grid item key={user.userInfo.id}>
                  <UserStatus user={user} />
                </Grid>
              )
            })}
          </Grid>
        </div>
      </>
    )
  }
)
UserList.displayName = "UserList"

export default UserList
