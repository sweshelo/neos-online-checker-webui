import { combineReducers } from "redux"
import sampleReducer from "./sample/reducer"
import neosReducer from "./neos/reducer"

const rootReducer = combineReducers({
  sampleReducer,
  neosReducer,
  // Add other reducers here
})

export default rootReducer
