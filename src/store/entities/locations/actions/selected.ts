import { action, payload } from "ts-action"

import { IState as ISelectedState } from "../reducers/selected"

export enum SelectedTypes {
  GET__REQUEST = "LOCATION__SELECTED__GET__REQUEST",
  GET__SUCCESS = "LOCATION__SELECTED__GET__SUCCESS",
  GET__FAILURE = "LOCATION__SELECTED__GET__FAILURE",
  CLEAR = "LOCATION__SELECTED__CLEAR",
}

type TRequiredSelectedState = Required<ISelectedState>
type TRequestGetSelectedPayload = {
  entity: TRequiredSelectedState["entity"]
  uuid: TRequiredSelectedState["data"]["uuid"]
}
export const SelectedActions = {
  requestGet: action(SelectedTypes.GET__REQUEST, payload<TRequestGetSelectedPayload>()),
  successGet: action(SelectedTypes.GET__SUCCESS, payload<TRequiredSelectedState["data"]>()),
  failureGet: action(SelectedTypes.GET__FAILURE, payload<TRequiredSelectedState["error"]>()),
  clear: action(SelectedTypes.CLEAR),
}
