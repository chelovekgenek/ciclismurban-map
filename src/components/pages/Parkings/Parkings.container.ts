import { connect } from "react-redux"

import {
  getParkingsLocations,
  getParkingsFetching,
  ParkingsGetActions,
  ParkingsDeleteActions,
} from "store/entities/locations"
import { TAppState } from "store/entities"

import { Parkings } from "./Parkings"

export interface IStateProps {
  parkings: ReturnType<typeof getParkingsLocations>
  fetching: ReturnType<typeof getParkingsFetching>
}
export interface IDispatchProps {
  getParkings: typeof ParkingsGetActions.request
  deleteParking: typeof ParkingsDeleteActions.request
}

export const ParkingsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    parkings: getParkingsLocations(state),
    fetching: getParkingsFetching(state),
  }),
  {
    getParkings: ParkingsGetActions.request,
    deleteParking: ParkingsDeleteActions.request,
  },
)(Parkings)
