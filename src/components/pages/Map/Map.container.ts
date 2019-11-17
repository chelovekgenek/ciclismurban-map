import { connect } from "react-redux"

import { ServicesGetActions, ShopsGetActions } from "store/entities/locations"
import { Actions as EventsActions } from "store/entities/locations/events"
import { Actions as ParkingsActions } from "store/entities/locations/parkings"

import { Map } from "./Map"

export interface IDispatchProps {
  getEvents: typeof EventsActions.Get.request
  getParkings: typeof ParkingsActions.Get.request
  getServices: typeof ServicesGetActions.request
  getShops: typeof ShopsGetActions.request
}

export const MapContainer = connect<null, IDispatchProps, {}, null>(
  null,
  {
    getEvents: EventsActions.Get.request,
    getParkings: ParkingsActions.Get.request,
    getServices: ServicesGetActions.request,
    getShops: ShopsGetActions.request,
  },
)(Map)
