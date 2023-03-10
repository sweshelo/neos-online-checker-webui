import { all, call, delay, put, takeEvery } from "redux-saga/effects"
import neosSaga from "./neos/saga"

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    call(neosSaga),
    // ... other sagas ...
  ])
}
