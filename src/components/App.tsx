import React from "react"
import logo from "./logo.svg"
import "./App.css"

import actions from "../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"

const App: React.FC = () => {
  const dispatch = useDispatch()
  const { count } = useSelector((state: RootState) => state.reducer)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          type="button"
          value="click"
          onClick={() => dispatch({ type: actions.INCREMENT })}
        />
        <p>{count}</p>
      </header>
    </div>
  )
}

export default App
