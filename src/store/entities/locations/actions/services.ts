import { action, payload } from "ts-action"

import { IState as IServicesState } from "../reducers/services"

export enum ServicesTypes {
  GET__REQUEST = "LOCATIONS__SERVICES__GET__REQUEST",
  GET__SUCCESS = "LOCATIONS__SERVICES__GET__SUCCESS",
  GET__FAILURE = "LOCATIONS__SERVICES__GET__FAILURE",
}

type TRequiredServicesState = Required<IServicesState>
export const ServicesActions = {
  requestGet: action(ServicesTypes.GET__REQUEST),
  successGet: action(ServicesTypes.GET__SUCCESS, payload<TRequiredServicesState["data"]>()),
  failureGet: action(ServicesTypes.GET__FAILURE, payload<TRequiredServicesState["error"]>()),
}
