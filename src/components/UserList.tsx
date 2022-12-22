import React from "react"
import { UserInfoAndUserStatus, Session } from "../types/neos"
import { useSelector } from "react-redux"
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

const UserStatus: React.FC<{ user: UserInfoAndUserStatus }> = ({ user }) => {
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
                  <ListItemButton>{session.name}</ListItemButton>
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

const UserList: React.FC = () => {
  const { users } = useSelector((state: RootState) => state.neosReducer)

  return (
    <>
      <div id={"user-list"}>
        <Grid container alignItems={"center"} justifyContent="center">
          {users.map((user: UserInfoAndUserStatus) => {
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
