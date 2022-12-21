import React from "react"
import "./UserList.css"
import { User, UserInfoAndUserStatus } from "../types/neos"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import neosActions from "../redux/neos/actions"

const UserStatus: React.FC<{ user: UserInfoAndUserStatus }> = ({ user }) => {
  return <div className="user-status-show">{user.userInfo.username}</div>
}

const UserList: React.FC = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state: RootState) => state.neosReducer)

  console.log("users:", users)
  return (
    <>
      <div id={"user-select-modal"}>
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
