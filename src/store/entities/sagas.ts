import { all, fork } from "redux-saga/effects"

import { watcher as locations } from "./locations"
import { watcher as user } from "./user"

export function* sagas() {
  yield all([fork(locations), fork(user)])
}
