import { connect } from "react-redux"

import { ParkingsGetActions, ServicesActions, ShopsActions, EventsActions } from "store/entities/locations"

import { Map } from "./Map"

export interface IDispatchProps {
  getEvents: typeof EventsActions.requestGet
  getParkings: typeof ParkingsGetActions.request
  getServices: typeof ServicesActions.requestGet
  getShops: typeof ShopsActions.requestGet
}

export const MapContainer = connect<null, IDispatchProps, {}, null>(
  null,
  {
    getEvents: EventsActions.requestGet,
    getParkings: ParkingsGetActions.request,
    getServices: ServicesActions.requestGet,
    getShops: ShopsActions.requestGet,
  },
)(Map)
