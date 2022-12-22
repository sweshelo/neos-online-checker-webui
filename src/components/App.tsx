import React, { useState } from "react"
import "./App.css"

import neosActions from "../redux/neos/actions"
import { useDispatch, useSelector } from "react-redux"
import UserSelectModal from "./UserSelectModal"
import UserList from "./UserList"

import { Button, TextField } from "@mui/material"

const App: React.FC = () => {
  const dispatch = useDispatch()
  const [usernameInput, setUsernameInput] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <TextField
          id="user-name"
          type={"text"}
          variant={"outlined"}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <Button
          id="submit"
          variant={"contained"}
          onClick={() =>
            dispatch(neosActions.searchUserActionCreator(usernameInput))
          }
        >
          Search
        </Button>
        <Button id="submit" variant={"contained"}>
          Save
        </Button>
        <Button id="submit" variant={"contained"}>
          Reload
        </Button>
      </header>
      <UserSelectModal />
      <UserList />
    </div>
  )
}

export default App
