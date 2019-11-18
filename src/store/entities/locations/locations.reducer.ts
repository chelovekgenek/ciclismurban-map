import { combineReducers } from "redux"

import filters from "./filters/filters.reducer"
import selected from "./selected/selected.reducer"

import events from "./events/events.reducer"
import parkings from "./parkings/parkings.reducer"
import services from "./services/services.reducer"
import shops from "./shops/shops.reducer"

export default combineReducers({
  filters,
  events,
  parkings,
  services,
  shops,
  selected,
})
