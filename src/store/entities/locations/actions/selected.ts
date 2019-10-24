import { action, payload } from "ts-action"

import { IState as ISelectedState } from "../reducers/selected"

export enum SelectedGetTypes {
  REQUEST = "LOCATION__SELECTED__GET__REQUEST",
  SUCCESS = "LOCATION__SELECTED__GET__SUCCESS",
  FAILURE = "LOCATION__SELECTED__GET__FAILURE",
}

export enum SelectedTypes {
  SET = "LOCATION__SELECTED__SET",
  CLEAR = "LOCATION__SELECTED__CLEAR",
}

type TState = Required<ISelectedState>
type TRequestGetPayload = {
  entity: TState["entity"]
  uuid: TState["data"]["uuid"]
}
export const SelectedGetActions = {
  request: action(SelectedGetTypes.REQUEST, payload<TRequestGetPayload>()),
  success: action(SelectedGetTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(SelectedGetTypes.FAILURE, payload<TState["error"]>()),
}

export const SelectedActions = {
  set: action(SelectedTypes.SET, payload<TState["data"]>()),
  clear: action(SelectedTypes.CLEAR),
}
