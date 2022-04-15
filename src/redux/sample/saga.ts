import { all, call, delay, put, takeEvery } from "redux-saga/effects"
import actions from "./actions"

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: actions.INCREMENT })
}

export function* watchIncrementAsync() {
  yield takeEvery(actions.INCREMENT_ASYNC, incrementAsync)
}

// single entry point to start all Sagas at once
export default function* sampleSaga() {
  yield all([call(watchIncrementAsync)])
}
