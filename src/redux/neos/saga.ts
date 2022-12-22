import {
  all,
  call,
  delay,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects"
import neosActions from "./actions"
import { ApiCall } from "../../helper/neosApiCall"
import { State } from "./reducer"
import { User, UserInfoAndUserStatus } from "../../types/neos"
import { setCookie } from "typescript-cookie"

export function* searchUser({ payload }: any): Generator<ApiCall> {
  const { username } = payload

  if (username == "") return

  try {
    const response = yield call(
      ApiCall.get,
      `https://api.neos.com/api/users?name=${username}`
    )
    yield put({ type: neosActions.REGISTER_SEARCH_RESULT, payload: response })
    yield put({ type: neosActions.MODAL_SHOW })
  } catch (err) {
    console.error(err)
  }
}

export function* searchUserById({ payload }: any): Generator<ApiCall> {
  const { userId } = payload

  if (userId == "") return

  try {
    const response = yield call(
      ApiCall.get,
      `https://api.neos.com/api/users/${userId}`
    )
    yield put({ type: neosActions.ADD_USER, payload: { user: response } })
    yield call(getUserState, { payload: { id: userId } })
  } catch (err) {
    console.error(err)
  }
}

export function* getUserState({ payload }: any): Generator<ApiCall> {
  const { id } = payload

  if (id == "") return

  try {
    const response = yield call(
      ApiCall.get,
      `https://api.neos.com/api/users/${id}/status`
    )
    yield put({
      type: neosActions.SET_STATUS,
      payload: { status: response, id },
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
  setCookie("user", JSON.stringify(userIdArray))
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

// single entry point to start all Sagas at once
export default function* neosSaga() {
  yield all([
    call(watchSearchUser),
    call(watchGetStatus),
    call(watchWriteUserListToCookie),
    call(watchSearchUserById),
  ])
}
