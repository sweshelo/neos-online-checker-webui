import { combineReducers } from "redux"
import sampleReducer from "./sample/reducer"

const rootReducer = combineReducers({
  sampleReducer,
})

export default rootReducer
