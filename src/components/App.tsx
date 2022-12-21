import React, { useState } from "react"
import "./App.css"

import neosActions from "../redux/neos/actions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import UserSelectModal from "./UserSelectModal"

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
          type={"text"}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          type={"button"}
          value={"search"}
          onClick={() =>
            dispatch(neosActions.searchUserActionCreator(usernameInput))
          }
        />
      </header>
      {isShowingModal && <UserSelectModal></UserSelectModal>}
    </div>
  )
}

export default App
