import React, { useState } from "react"
import "./App.css"

import neosActions from "../redux/neos/actions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import UserSelectModal from "./UserSelectModal"
import UserList from "./UserList"

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { isShowingModal } = useSelector(
    (state: RootState) => state.neosReducer
  )
  const [usernameInput, setUsernameInput] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <input
          id={"user-investigate"}
          type={"text"}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          id={"user-investigate-submit"}
          type={"button"}
          value={"search"}
          onClick={() =>
            dispatch(neosActions.searchUserActionCreator(usernameInput))
          }
        />
      </header>
      {isShowingModal && <UserSelectModal />}
      <UserList />
    </div>
  )
}

export default App
