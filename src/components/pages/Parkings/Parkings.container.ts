import { connect } from "react-redux"

import { Actions, Selectors } from "store/entities/locations/parkings"
import { TAppState } from "store/entities"

import { Parkings } from "./Parkings"

export interface IStateProps {
  parkings: ReturnType<typeof Selectors.getLocations>
  fetching: ReturnType<typeof Selectors.getFetching>
}
export interface IDispatchProps {
  getParkings: typeof Actions.Get.request
  deleteParking: typeof Actions.Delete.request
}

export const ParkingsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    parkings: Selectors.getLocations(state),
    fetching: Selectors.getFetching(state),
  }),
  {
    getParkings: Actions.Get.request,
    deleteParking: Actions.Delete.request,
  },
)(Parkings)
