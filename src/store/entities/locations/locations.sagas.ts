import { all, fork } from "redux-saga/effects"

import filters from "./filters/filters.sagas"
import selected from "./selected/selected.sagas"
import events from "./events/events.sagas"
import parkings from "./parkings/parkings.sagas"
import services from "./services/services.sagas"
import shops from "./shops/shops.sagas"

export default function*() {
  yield all([fork(filters), fork(selected), fork(events), fork(parkings), fork(services), fork(shops)])
}
