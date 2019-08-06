import { IState as IShopsState } from "../reducers/shops"
import { action, payload } from "ts-action"

export enum ShopsTypes {
  GET__REQUEST = "LOCATIONS__SHOPS__GET__REQUEST",
  GET__SUCCESS = "LOCATIONS__SHOPS__GET__SUCCESS",
  GET__FAILURE = "LOCATIONS__SHOPS__GET__FAILURE",
}

type TRequiredShopsState = Required<IShopsState>
export const ShopsActions = {
  requestGet: action(ShopsTypes.GET__REQUEST),
  successGet: action(ShopsTypes.GET__SUCCESS, payload<TRequiredShopsState["data"]>()),
  failureGet: action(ShopsTypes.GET__FAILURE, payload<TRequiredShopsState["error"]>()),
}
