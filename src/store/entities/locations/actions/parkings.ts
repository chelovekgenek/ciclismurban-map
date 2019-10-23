import { payload, action } from "ts-action"

import { IState as IParkingsState } from "../reducers/parkings"

export enum ParkingsGetTypes {
  REQUEST = "LOCATIONS__PARKINGS__GET__REQUEST",
  SUCCESS = "LOCATIONS__PARKINGS__GET__SUCCESS",
  FAILURE = "LOCATIONS__PARKINGS__GET__FAILURE",
}

export enum ParkingsCreateTypes {
  REQUEST = "LOCATIONS__PARKINGS__CREATE__REQUEST",
  SUCCESS = "LOCATIONS__PARKINGS__CREATE__SUCCESS",
  FAILURE = "LOCATIONS__PARKINGS__CREATE__FAILURE",
}

export enum ParkingsUpdateTypes {
  REQUEST = "LOCATIONS__PARKINGS__UPDATE__REQUEST",
  SUCCESS = "LOCATIONS__PARKINGS__UPDATE__SUCCESS",
  FAILURE = "LOCATIONS__PARKINGS__UPDATE__FAILURE",
}

export enum ParkingsDeleteTypes {
  REQUEST = "LOCATIONS__PARKINGS__DELETE__REQUEST",
  SUCCESS = "LOCATIONS__PARKINGS__DELETE__SUCCESS",
  FAILURE = "LOCATIONS__PARKINGS__DELETE__FAILURE",
}

type TState = Required<IParkingsState>
type TStateData = TState["data"][number]

export const ParkingsGetActions = {
  request: action(ParkingsGetTypes.REQUEST),
  success: action(ParkingsGetTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(ParkingsGetTypes.FAILURE, payload<TState["error"]>()),
}

export const ParkingsCreateActions = {
  request: action(ParkingsCreateTypes.REQUEST, payload<Partial<TStateData>>()),
  success: action(ParkingsCreateTypes.SUCCESS, payload<TStateData>()),
  failure: action(ParkingsCreateTypes.FAILURE, payload<TState["error"]>()),
}

interface TUpdatePayload {
  uuid: TStateData["uuid"]
  payload: Partial<TStateData>
}
export const ParkingsUpdateActions = {
  request: action(ParkingsUpdateTypes.REQUEST, payload<TUpdatePayload>()),
  success: action(ParkingsUpdateTypes.SUCCESS, payload<TStateData>()),
  failure: action(ParkingsUpdateTypes.FAILURE, payload<TState["error"]>()),
}

export const ParkingsDeleteActions = {
  request: action(ParkingsDeleteTypes.REQUEST, payload<TStateData["uuid"]>()),
  success: action(ParkingsDeleteTypes.SUCCESS, payload<TStateData["uuid"]>()),
  failure: action(ParkingsDeleteTypes.FAILURE, payload<TState["error"]>()),
}
