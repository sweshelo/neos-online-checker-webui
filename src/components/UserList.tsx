import React from "react"
import "./UserList.css"
import { User, UserInfoAndUserStatus, Session } from "../types/neos"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import {
  Card,
  CardContent,
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
    <Card className="user-status-show">
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
              return (
                <ListItem
                  key={session.sessionId + user.userInfo.id}
                  disablePadding
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
  const dispatch = useDispatch()
  const { users } = useSelector((state: RootState) => state.neosReducer)

  return (
    <>
      <div id={"user-list"}>
        <ul>
          {users.map((user: UserInfoAndUserStatus) => {
            return <UserStatus user={user} key={user.userInfo.id} />
          })}
        </ul>
      </div>
    </>
  )
}

export default UserList
