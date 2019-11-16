import { connect } from "react-redux"

import { ParkingsGetActions, ServicesGetActions, ShopsGetActions } from "store/entities/locations"
import { Actions as EventsActions } from "store/entities/locations/events"

import { Map } from "./Map"

export interface IDispatchProps {
  getEvents: typeof EventsActions.Get.request
  getParkings: typeof ParkingsGetActions.request
  getServices: typeof ServicesGetActions.request
  getShops: typeof ShopsGetActions.request
}

export const MapContainer = connect<null, IDispatchProps, {}, null>(
  null,
  {
    getEvents: EventsActions.Get.request,
    getParkings: ParkingsGetActions.request,
    getServices: ServicesGetActions.request,
    getShops: ShopsGetActions.request,
  },
)(Map)
