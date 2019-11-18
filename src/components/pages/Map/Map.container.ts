import { connect } from "react-redux"

import { Events, Parkings, Services, Shops } from "store/entities/locations"

import { Map } from "./Map"

export interface IDispatchProps {
  getEvents: typeof Events.Actions.Get.request
  getParkings: typeof Parkings.Actions.Get.request
  getServices: typeof Services.Actions.Get.request
  getShops: typeof Shops.Actions.Get.request
}

export const MapContainer = connect<null, IDispatchProps, {}, null>(
  null,
  {
    getEvents: Events.Actions.Get.request,
    getParkings: Parkings.Actions.Get.request,
    getServices: Services.Actions.Get.request,
    getShops: Shops.Actions.Get.request,
  },
)(Map)
