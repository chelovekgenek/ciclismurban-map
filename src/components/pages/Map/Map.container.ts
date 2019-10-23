import { connect } from "react-redux"

import { ParkingsGetActions, ServicesActions, ShopsActions, EventsGetActions } from "store/entities/locations"

import { Map } from "./Map"

export interface IDispatchProps {
  getEvents: typeof EventsGetActions.request
  getParkings: typeof ParkingsGetActions.request
  getServices: typeof ServicesActions.requestGet
  getShops: typeof ShopsActions.requestGet
}

export const MapContainer = connect<null, IDispatchProps, {}, null>(
  null,
  {
    getEvents: EventsGetActions.request,
    getParkings: ParkingsGetActions.request,
    getServices: ServicesActions.requestGet,
    getShops: ShopsActions.requestGet,
  },
)(Map)
