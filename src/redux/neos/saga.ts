import { all, call, put, select, takeEvery } from "redux-saga/effects"
import neosActions from "./actions"
import { ApiCall } from "../../helper/neosApiCall"
import { State } from "./reducer"
import { UserInfoAndUserStatus, Credentials } from "../../types/neos"
import { Cookies, setCookie } from "typescript-cookie"

export function* searchUser({ payload }: any): Generator<ApiCall> {
  const { username } = payload

  if (username == "") return

  try {
    const response = yield call(ApiCall.get, `users?name=${username}`)
    yield put({ type: neosActions.REGISTER_SEARCH_RESULT, payload: response })
    yield put({ type: neosActions.MODAL_SHOW })
  } catch (err) {
    console.error(err)
  }
}

export function* searchUserById({ payload }: any): any {
  const { userId } = payload
  const { users }: State = yield select((state) => state.neosReducer)

  let checkDuplicate = false
  users.forEach((user: UserInfoAndUserStatus) => {
    if (user.userInfo.id == userId) checkDuplicate = true
  })
  if (userId == "" || checkDuplicate) return

  try {
    const response = yield call(ApiCall.get, `users/${userId}`)
    yield put({ type: neosActions.ADD_USER, payload: { user: response } })
  } catch (err) {
    console.error(err)
  }
}

function* fetchUserStatus(
  user: UserInfoAndUserStatus
): Generator<unknown, any> {
  try {
    const response = yield call(
      ApiCall.get,
      `users/${user.userInfo.id}/status`
    )
    return {
      userInfo: user.userInfo,
      status: response,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export function* getUserState(): Generator<unknown, void, any> {
  const { users }: State = yield select((state) => state.neosReducer)
  try {
    const userStatuses = yield all(
      users.map((user) => call(fetchUserStatus, user))
    )
    yield put({
      type: neosActions.SET_STATUS,
      payload: userStatuses,
    })
  } catch (err) {
    console.error(err)
  }
}

export function* loginNeos({ payload }: any): Generator<ApiCall> {
  const { username, password } = payload

  if (username == "" || password == "") return

  try {
    const response = yield call(ApiCall.post, "userSessions", {
      username,
      password,
      rememberMe: true,
    })
    yield put({
      type: neosActions.SAVE_CREDENTIALS,
      payload: { credentials: response },
    })
    Cookies.set(
      "auth",
      `neos ${(response as Credentials).userId}:${
        (response as Credentials).token
      }`
    )
    yield call(getFriends)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

export function* getFriends(): any {
  const { you }: State = yield select((state) => state.neosReducer)
  try {
    const response = yield call(ApiCall.get, `users/${you?.userId}/friends`)
    yield put({
      type: neosActions.SET_FRIENDS,
      payload: { friends: response },
    })
    yield put({
      type: neosActions.LOGIN_MODAL_HIDE,
    })
    yield put({
      type: neosActions.IMPORT_MODAL_SHOW,
    })
  } catch (err) {
    console.error(err)
  }
}

export function* writeUserListToCookie() {
  const { users }: State = yield select((state) => state.neosReducer)
  const userIdArray = users.map((user: UserInfoAndUserStatus): string => {
    return user.userInfo.id
  })
  setCookie("user", JSON.stringify(userIdArray), { expires: 60 })
}

function* deleteUsersWhoDidNotLoginForThreeMonths() {
  const { users }: State = yield select((state) => state.neosReducer)
  try {
    yield all(
      users.map(function* (user) {
        if (user.status?.lastStatusChange) {
          const date = new Date(user.status.lastStatusChange)
          const threeMonthAgo = new Date()
          threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3)
          if (date <= threeMonthAgo) {
            console.log(`delete: ${user.userInfo.username}`)
            yield put(
              neosActions.deleteUserByIdActionCreator(user.userInfo.id)
            )
          }
        }
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export function* watchSearchUser() {
  yield takeEvery(neosActions.SEARCH_USER, searchUser)
}

export function* watchGetStatus() {
  yield takeEvery(neosActions.GET_STATUS, getUserState)
}

export function* watchWriteUserListToCookie() {
  yield takeEvery(neosActions.WRITE_TO_COOKIE, writeUserListToCookie)
}

export function* watchSearchUserById() {
  yield takeEvery(neosActions.SEARCH_USER_BY_ID, searchUserById)
}

export function* watchLoginNeos() {
  yield takeEvery(neosActions.LOGIN_NEOS, loginNeos)
}

// single entry point to start all Sagas at once
export default function* neosSaga() {
  yield all([
    call(watchSearchUser),
    call(watchGetStatus),
    call(watchWriteUserListToCookie),
    call(watchSearchUserById),
    call(watchLoginNeos),
    takeEvery(
      neosActions.DELETE_USERS_WHO_DID_NOT_LOGIN_FOR_THREE_MONTHES,
      deleteUsersWhoDidNotLoginForThreeMonths
    ),
  ])
}
