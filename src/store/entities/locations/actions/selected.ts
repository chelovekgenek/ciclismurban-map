import { action, payload } from "ts-action"

import { IState as ISelectedState } from "../reducers/selected"

export enum SelectedTypes {
  GET__REQUEST = "LOCATION__SELECTED__GET__REQUEST",
  GET__SUCCESS = "LOCATION__SELECTED__GET__SUCCESS",
  GET__FAILURE = "LOCATION__SELECTED__GET__FAILURE",
  CLEAR = "LOCATION__SELECTED__CLEAR",
}

type TState = Required<ISelectedState>
type TRequestGetPayload = {
  entity: TState["entity"]
  uuid: TState["data"]["uuid"]
}
export const SelectedActions = {
  requestGet: action(SelectedTypes.GET__REQUEST, payload<TRequestGetPayload>()),
  successGet: action(SelectedTypes.GET__SUCCESS, payload<TState["data"]>()),
  failureGet: action(SelectedTypes.GET__FAILURE, payload<TState["error"]>()),
  clear: action(SelectedTypes.CLEAR),
}
