import { combineReducers } from "redux"
import neosReducer from "./neos/reducer"

const rootReducer = combineReducers({
  neosReducer,
  // Add other reducers here
})

export default rootReducer
