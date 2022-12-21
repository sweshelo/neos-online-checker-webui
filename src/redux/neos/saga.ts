import { all, call, delay, put, takeEvery } from "redux-saga/effects"
import neosActions from "./actions"
import { ApiCall } from "../../helper/neosApiCall"

export function* searchUser({ payload }: any): Generator<ApiCall> {
  const { username } = payload
  console.log(`Request: ${username}`)

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

export function* getUserState({ payload }: any): Generator<ApiCall> {
  const { id } = payload
  console.log(`Status: ${id}`)

  if (id == "") return

  try {
    const response = yield call(
      ApiCall.get,
      `https://api.neos.com/api/users/${id}`
    )
    console.log(response)
    yield put({ type: neosActions.SET_STATUS, payload: { user: response } })
  } catch (err) {
    console.error(err)
  }
}

export function* watchSearchUser() {
  yield takeEvery(neosActions.SEARCH_USER, searchUser)
}

export function* watchGetStatus() {
  yield takeEvery(neosActions.GET_STATUS, getUserState)
}

// single entry point to start all Sagas at once
export default function* neosSaga() {
  yield all([call(watchSearchUser), call(watchGetStatus)])
}
