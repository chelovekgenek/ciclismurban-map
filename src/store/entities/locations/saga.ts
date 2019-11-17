import { all, fork } from "redux-saga/effects"

import { watcher as current } from "./sagas/current"
import filters from "./filters/filters.sagas"
import { watcher as selected } from "./sagas/selected"
import events from "./events/events.sagas"
import parkings from "./parkings/parkings.sagas"
import services from "./services/services.sagas"
import shops from "./shops/shops.sagas"

export default function*() {
  yield all([fork(current), fork(filters), fork(selected), fork(events), fork(parkings), fork(services), fork(shops)])
}
