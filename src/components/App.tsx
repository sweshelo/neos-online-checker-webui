import React, { useState, useEffect } from "react"
import "./App.css"

import neosActions from "../redux/neos/actions"
import { useDispatch, useSelector } from "react-redux"
import UserSelectModal from "./UserSelectModal"
import UserList from "./UserList"

import { Box, Button, Grid, Stack, TextField } from "@mui/material"
import { RootState } from "../redux/store"
import { UserInfoAndUserStatus } from "../types/neos"
import LoginModal from "./Login"
import FriendImportModal from "./FriendsImportModal"
import SessionDetailModal from "./SessionDetailModal"

const App: React.FC = () => {
  const dispatch = useDispatch()
  const [usernameInput, setUsernameInput] = useState("")
  const {
    isShowingFriendImportModal,
    isShowingSessionModal,
    friends,
    users,
    session,
    searchResult,
    isShowingModal,
  } = useSelector((state: RootState) => state.neosReducer)

  const fetchAllUsers = () => {
    dispatch(neosActions.getUserStateActionCreator())
  }

  // 初回ロード時
  useEffect(() => fetchAllUsers(), [])

  return (
    <div className="App">
      <Stack
        direction={"row"}
        style={{
          justifyContent: "center",
          margin: "8px",
        }}
      >
        <TextField
          className="App-header-content"
          type={"text"}
          variant={"outlined"}
          placeholder={"UserName"}
          onChange={(e) => {
            setUsernameInput(e.target.value)
          }}
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
          onClick={fetchAllUsers}
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
        <Button
          variant="contained"
          className="App-header-content"
          sx={{ margin: "0 5px" }}
          onClick={() =>
            dispatch(neosActions.deleteUsersWhoDidNotLoginForThreeMonths())
          }
        >
          3ヶ月ログインのない
          <br />
          ユーザを削除
        </Button>
      </Stack>
      <UserSelectModal
        searchResult={searchResult}
        open={isShowingModal}
        users={users}
      />
      <LoginModal />
      <FriendImportModal friends={friends} open={isShowingFriendImportModal} />
      <SessionDetailModal
        session={session}
        users={users}
        open={isShowingSessionModal}
      />
      <UserList users={users} />
    </div>
  )
}

export default App
