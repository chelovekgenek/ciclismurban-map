import { all, fork } from "redux-saga/effects"

import locations from "./locations/saga"
import user from "./user/saga"

export function* sagas() {
  yield all([fork(locations), fork(user)])
}
