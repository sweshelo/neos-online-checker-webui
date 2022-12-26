import React from "react"
import { UserInfoAndUserStatus, Session } from "../types/neos"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material"
import neosActions from "../redux/neos/actions"

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
        <Typography sx={{ fontSize: 20 }} component="span" paddingX={1}>
          {user.userInfo.username}
        </Typography>
        <Typography sx={{ fontSize: 15 }} color={"gray"} component="span">
          {user.userInfo.id}
        </Typography>
        <Typography sx={{ fontSize: 19 }} color={color}>
          {user.status?.onlineStatus}
        </Typography>
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

const UserList: React.FC = () => {
  const { users } = useSelector((state: RootState) => state.neosReducer)

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

export default UserList
