import { combineReducers } from "redux"

import parkings from "./reducers/parkings"
import services from "./reducers/services"
import shops from "./reducers/shops"

export const reducer = combineReducers({ parkings, services, shops })
