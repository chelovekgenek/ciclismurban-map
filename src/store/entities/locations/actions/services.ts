import { action, payload } from "ts-action"

import { IState as IServicesState } from "../reducers/services"

export enum ServicesGetTypes {
  REQUEST = "LOCATIONS__SERVICES__GET__REQUEST",
  SUCCESS = "LOCATIONS__SERVICES__GET__SUCCESS",
  FAILURE = "LOCATIONS__SERVICES__GET__FAILURE",
}

export enum ServicesCreateTypes {
  REQUEST = "LOCATIONS__SERVICES__CREATE__REQUEST",
  SUCCESS = "LOCATIONS__SERVICES__CREATE__SUCCESS",
  FAILURE = "LOCATIONS__SERVICES__CREATE__FAILURE",
}

export enum ServicesUpdateTypes {
  REQUEST = "LOCATIONS__SERVICES__UPDATE__REQUEST",
  SUCCESS = "LOCATIONS__SERVICES__UPDATE__SUCCESS",
  FAILURE = "LOCATIONS__SERVICES__UPDATE__FAILURE",
}

export enum ServicesDeleteTypes {
  REQUEST = "LOCATIONS__SERVICES__DELETE__REQUEST",
  SUCCESS = "LOCATIONS__SERVICES__DELETE__SUCCESS",
  FAILURE = "LOCATIONS__SERVICES__DELETE__FAILURE",
}

type TState = Required<IServicesState>
type TStateData = TState["data"][number]

export const ServicesGetActions = {
  request: action(ServicesGetTypes.REQUEST),
  success: action(ServicesGetTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(ServicesGetTypes.FAILURE, payload<TState["error"]>()),
}

export const ServicesCreateActions = {
  request: action(ServicesCreateTypes.REQUEST, payload<Partial<TStateData>>()),
  success: action(ServicesCreateTypes.SUCCESS, payload<TStateData>()),
  failure: action(ServicesCreateTypes.FAILURE, payload<TState["error"]>()),
}

interface TUpdatePayload {
  uuid: TStateData["uuid"]
  payload: Partial<TStateData>
}
export const ServicesUpdateActions = {
  request: action(ServicesUpdateTypes.REQUEST, payload<TUpdatePayload>()),
  success: action(ServicesUpdateTypes.SUCCESS, payload<TStateData>()),
  failure: action(ServicesUpdateTypes.FAILURE, payload<TState["error"]>()),
}

export const ServicesDeleteActions = {
  request: action(ServicesDeleteTypes.REQUEST, payload<TStateData["uuid"]>()),
  success: action(ServicesDeleteTypes.SUCCESS, payload<TStateData["uuid"]>()),
  failure: action(ServicesDeleteTypes.FAILURE, payload<TState["error"]>()),
}
