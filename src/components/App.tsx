import React, { useState, useEffect } from "react"
import "./App.css"

import neosActions from "../redux/neos/actions"
import { useDispatch, useSelector } from "react-redux"
import UserSelectModal from "./UserSelectModal"
import UserList from "./UserList"

import { Button, TextField } from "@mui/material"
import { getCookie } from "typescript-cookie"
import { RootState } from "../redux/store"
import { UserInfoAndUserStatus } from "../types/neos"
import LoginModal from "./Login"
import FriendImportModal from "./FriendsImportModal"

const App: React.FC = () => {
  const dispatch = useDispatch()
  const [usernameInput, setUsernameInput] = useState("")
  const { users } = useSelector((state: RootState) => state.neosReducer)

  useEffect(() => {
    JSON.parse(getCookie("user") || "[]").forEach((userId: string) => {
      dispatch(neosActions.searchUserByIdActionCreator(userId))
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <TextField
          id="user-name"
          className="App-header-content"
          type={"text"}
          variant={"outlined"}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <Button
          id="submit"
          className="App-header-content"
          variant={"contained"}
          sx={{ margin: "0 5px" }}
          onClick={() =>
            dispatch(neosActions.searchUserActionCreator(usernameInput))
          }
        >
          Search
        </Button>
        <Button
          variant={"contained"}
          className="App-header-content"
          sx={{ margin: "0 5px" }}
          onClick={() => {
            users.forEach((user: UserInfoAndUserStatus) => {
              dispatch(neosActions.getUserStateActionCreator(user.userInfo.id))
            })
          }}
        >
          Reload
        </Button>
        <Button
          variant="contained"
          className="App-header-content"
          sx={{ margin: "0 5px" }}
          onClick={() => dispatch({ type: neosActions.LOGIN_MODAL_SHOW })}
        >
          フレンドをインポート
        </Button>
      </header>
      <UserSelectModal />
      <LoginModal />
      <FriendImportModal />
      <UserList />
    </div>
  )
}

export default App
