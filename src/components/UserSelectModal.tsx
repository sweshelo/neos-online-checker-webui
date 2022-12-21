import React from "react"
import "./UserSelectModal.css"
import { User } from "../types/neos"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import neosActions from "../redux/neos/actions"

const UserSelectButton: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <div
      id={"user-select-button"}
      onClick={() => {
        dispatch(neosActions.addUserActionCreator(user))
        dispatch(neosActions.getUserStateActionCreator(user.id))
      }}
    >
      <h3>{user.username}</h3>
      <p>ID: {user.id}</p>
      <p>
        登録日: {new Date(user.registrationDate).toLocaleDateString("ja-JP")}
      </p>
    </div>
  )
}

const UserSelectModal: React.FC = () => {
  const dispatch = useDispatch()
  const { searchResult } = useSelector((state: RootState) => state.neosReducer)

  return (
    <>
      <div
        id={"modal-overlay"}
        onClick={() => {
          dispatch({ type: neosActions.MODAL_HIDE })
        }}
      >
        <div id={"user-select-modal"}>
          <h2>ユーザを選択</h2>
          <ul>
            {searchResult.map((user: User) => {
              return <UserSelectButton user={user} key={user.id} />
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default UserSelectModal
