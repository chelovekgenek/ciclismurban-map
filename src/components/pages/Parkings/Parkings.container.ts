import { connect } from "react-redux"

import { Actions as ParkingsActions, Selectors as ParkingsSelectors } from "store/entities/locations/parkings"
import { TAppState } from "store/entities"

import { Parkings } from "./Parkings"

export interface IStateProps {
  parkings: ReturnType<typeof ParkingsSelectors.getLocations>
  fetching: ReturnType<typeof ParkingsSelectors.getFetching>
}
export interface IDispatchProps {
  getParkings: typeof ParkingsActions.Get.request
  deleteParking: typeof ParkingsActions.Delete.request
}

export const ParkingsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    parkings: ParkingsSelectors.getLocations(state),
    fetching: ParkingsSelectors.getFetching(state),
  }),
  {
    getParkings: ParkingsActions.Get.request,
    deleteParking: ParkingsActions.Delete.request,
  },
)(Parkings)
