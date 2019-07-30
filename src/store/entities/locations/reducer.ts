import { combineReducers } from "redux"

import filters from "./reducers/filters"
import current from "./reducers/current"

import parkings from "./reducers/parkings"
import services from "./reducers/services"
import shops from "./reducers/shops"

export const reducer = combineReducers({ filters, current, parkings, services, shops })
