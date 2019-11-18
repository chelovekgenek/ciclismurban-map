import { combineReducers } from "redux"

import user from "./user/user.reducer"
import position from "./position/position.reducer"

export default combineReducers({
  user,
  position,
})
