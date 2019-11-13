import { all, fork } from "redux-saga/effects"

import locations from "./locations/saga"
import auth from "./auth/saga"

export function* sagas() {
  yield all([fork(locations), fork(auth)])
}
