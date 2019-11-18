import { all, fork } from "redux-saga/effects"

import user from "./user/user.sagas"
import position from "./position/position.sagas"

export default function* AppSagas() {
  yield all([fork(user), fork(position)])
}
