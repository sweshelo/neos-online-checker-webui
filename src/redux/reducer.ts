import { combineReducers } from "redux"
import sampleReducer from "./sample/reducer"

const rootReducer = combineReducers({
  sampleReducer,
  // Add other reducers here
})

export default rootReducer
