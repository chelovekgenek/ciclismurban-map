import { all, fork } from "redux-saga/effects"

import locations from "./locations/saga"
import auth from "./auth/saga"
import me from "./me/sagas"

export function* AppSagas() {
  yield all([fork(locations), fork(auth), fork(me)])
}
