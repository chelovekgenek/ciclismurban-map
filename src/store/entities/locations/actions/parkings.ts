import { payload, action } from "ts-action"

import { IState as IParkingsState } from "../reducers/parkings"

export enum ParkingsTypes {
  GET__REQUEST = "LOCATIONS__PARKINGS__GET__REQUEST",
  GET__SUCCESS = "LOCATIONS__PARKINGS__GET__SUCCESS",
  GET__FAILURE = "LOCATIONS__PARKINGS__GET__FAILURE",
}

type TRequiredParkingsState = Required<IParkingsState>
export const ParkingsActions = {
  requestGet: action(ParkingsTypes.GET__REQUEST),
  successGet: action(ParkingsTypes.GET__SUCCESS, payload<TRequiredParkingsState["data"]>()),
  failureGet: action(ParkingsTypes.GET__FAILURE, payload<TRequiredParkingsState["error"]>()),
}
