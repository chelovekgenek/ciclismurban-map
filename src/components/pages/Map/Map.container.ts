import { connect } from "react-redux"

import { ShopsGetActions } from "store/entities/locations"
import { Actions as EventsActions } from "store/entities/locations/events"
import { Actions as ParkingsActions } from "store/entities/locations/parkings"
import { Actions as ServicesActions } from "store/entities/locations/services"

import { Map } from "./Map"

export interface IDispatchProps {
  getEvents: typeof EventsActions.Get.request
  getParkings: typeof ParkingsActions.Get.request
  getServices: typeof ServicesActions.Get.request
  getShops: typeof ShopsGetActions.request
}

export const MapContainer = connect<null, IDispatchProps, {}, null>(
  null,
  {
    getEvents: EventsActions.Get.request,
    getParkings: ParkingsActions.Get.request,
    getServices: ServicesActions.Get.request,
    getShops: ShopsGetActions.request,
  },
)(Map)
