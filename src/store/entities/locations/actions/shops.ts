import { action, payload } from "ts-action"

import { IState as IShopsState } from "../reducers/shops"

export enum ShopsGetTypes {
  REQUEST = "LOCATIONS__SHOPS__GET__REQUEST",
  SUCCESS = "LOCATIONS__SHOPS__GET__SUCCESS",
  FAILURE = "LOCATIONS__SHOPS__GET__FAILURE",
}

export enum ShopsCreateTypes {
  REQUEST = "LOCATIONS__SHOPS__CREATE__REQUEST",
  SUCCESS = "LOCATIONS__SHOPS__CREATE__SUCCESS",
  FAILURE = "LOCATIONS__SHOPS__CREATE__FAILURE",
}

export enum ShopsUpdateTypes {
  REQUEST = "LOCATIONS__SHOPS__UPDATE__REQUEST",
  SUCCESS = "LOCATIONS__SHOPS__UPDATE__SUCCESS",
  FAILURE = "LOCATIONS__SHOPS__UPDATE__FAILURE",
}

export enum ShopsDeleteTypes {
  REQUEST = "LOCATIONS__SHOPS__DELETE__REQUEST",
  SUCCESS = "LOCATIONS__SHOPS__DELETE__SUCCESS",
  FAILURE = "LOCATIONS__SHOPS__DELETE__FAILURE",
}

type TState = Required<IShopsState>
type TStateData = TState["data"][number]

export const ShopsGetActions = {
  request: action(ShopsGetTypes.REQUEST),
  success: action(ShopsGetTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(ShopsGetTypes.FAILURE, payload<TState["error"]>()),
}

export const ShopsCreateActions = {
  request: action(ShopsCreateTypes.REQUEST, payload<Partial<TStateData>>()),
  success: action(ShopsCreateTypes.SUCCESS, payload<TStateData>()),
  failure: action(ShopsCreateTypes.FAILURE, payload<TState["error"]>()),
}

interface TUpdatePayload {
  uuid: TStateData["uuid"]
  payload: Partial<TStateData>
}
export const ShopsUpdateActions = {
  request: action(ShopsUpdateTypes.REQUEST, payload<TUpdatePayload>()),
  success: action(ShopsUpdateTypes.SUCCESS, payload<TStateData>()),
  failure: action(ShopsUpdateTypes.FAILURE, payload<TState["error"]>()),
}

export const ShopsDeleteActions = {
  request: action(ShopsDeleteTypes.REQUEST, payload<TStateData["uuid"]>()),
  success: action(ShopsDeleteTypes.SUCCESS, payload<TStateData["uuid"]>()),
  failure: action(ShopsDeleteTypes.FAILURE, payload<TState["error"]>()),
}
