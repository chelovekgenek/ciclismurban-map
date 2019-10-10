import { payload, action } from "ts-action"

import { IState as IParkingsState } from "../reducers/parkings"

export enum ParkingsGetTypes {
  REQUEST = "LOCATIONS__PARKINGS__GET__REQUEST",
  SUCCESS = "LOCATIONS__PARKINGS__GET__SUCCESS",
  FAILURE = "LOCATIONS__PARKINGS__GET__FAILURE",
}

export enum ParkingDeleteTypes {
  REQUEST = "LOCATIONS__PARKINGS__DELETE__REQUEST",
  SUCCESS = "LOCATIONS__PARKINGS__DELETE__SUCCESS",
  FAILURE = "LOCATIONS__PARKINGS__DELETE__FAILURE",
}

type TRequiredParkingsState = Required<IParkingsState>

export const ParkingsGetActions = {
  request: action(ParkingsGetTypes.REQUEST),
  success: action(ParkingsGetTypes.SUCCESS, payload<TRequiredParkingsState["data"]>()),
  failure: action(ParkingsGetTypes.FAILURE, payload<TRequiredParkingsState["error"]>()),
}

export const ParkingsDeleteActions = {
  request: action(ParkingDeleteTypes.REQUEST, payload<TRequiredParkingsState["data"][number]["uuid"]>()),
}
