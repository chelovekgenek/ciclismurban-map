import { combineReducers } from "redux"

import filters from "./filters/filters.reducer"
import current from "./reducers/current"
import selected from "./reducers/selected"

import events from "./events/events.reducer"
import parkings from "./parkings/parkings.reducer"
import services from "./services/services.reducer"
import shops from "./reducers/shops"

export default combineReducers({
  filters,
  current,
  events,
  parkings,
  services,
  shops,
  selected,
})
