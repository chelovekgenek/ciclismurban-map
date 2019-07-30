import { all, fork } from "redux-saga/effects"

import { watcher as locations } from "./locations/saga"

export function* sagas() {
  yield all([fork(locations)])
}
