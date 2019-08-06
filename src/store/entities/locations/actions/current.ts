import { action, payload } from "ts-action"

import { IState as ICurrentState } from "../reducers/current"

export enum CurrentTypes {
  POLLING__START = "LOCATIONS__CURRENT__POLLING__START",
  POLLING__STOP = "LOCATIONS__CURRENT__POLLING__STOP",
  GET__REQUEST = "LOCATIONS__CURRENT__GET__REQUEST",
  GET__SUCCESS = "LOCATIONS__CURRENT__GET__SUCCESS",
  GET__FAILURE = "LOCATIONS__CURRENT__GET__FAILURE",
}

type TRequiredCurrentState = Required<ICurrentState>
export const CurrentActions = {
  pollingStart: action(CurrentTypes.POLLING__START),
  pollingStop: action(CurrentTypes.POLLING__STOP),
  requestGet: action(CurrentTypes.GET__REQUEST),
  successGet: action(CurrentTypes.GET__SUCCESS, payload<TRequiredCurrentState["data"]>()),
  failureGet: action(CurrentTypes.GET__FAILURE, payload<TRequiredCurrentState["error"]>()),
}
