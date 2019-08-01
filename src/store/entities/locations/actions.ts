import { action, payload } from "ts-action"

import { IState as IFiltersState } from "./reducers/filters"
import { IState as ICurrentState } from "./reducers/current"
import { IState as IParkingsState } from "./reducers/parkings"
import { IState as IServicesState } from "./reducers/services"
import { IState as IShopsState } from "./reducers/shops"
import { IState as ISelectedState } from "./reducers/selected"
import { TRequiredLocation } from "./interface"

export const types = {
  TOGGLE: "LOCATIONS__FILTERS__TOGGLE",
  RESET: "LOCATIONS__FILTERS__RESET",

  CURRENT__POLLING__START: "LOCATIONS__CURRENT__POLLING__START",
  CURRENT__POLLING__STOP: "LOCATIONS__CURRENT__POLLING__STOP",

  CURRENT__GET__REQUEST: "LOCATIONS__CURRENT__GET__REQUEST",
  CURRENT__GET__SUCCESS: "LOCATIONS__CURRENT__GET__SUCCESS",
  CURRENT__GET__FAILURE: "LOCATIONS__CURRENT__GET__FAILURE",

  PARKINGS__GET__REQUEST: "LOCATIONS__PARKINGS__GET__REQUEST",
  PARKINGS__GET__SUCCESS: "LOCATIONS__PARKINGS__GET__SUCCESS",
  PARKINGS__GET__FAILURE: "LOCATIONS__PARKINGS__GET__FAILURE",

  SERVICES__GET__REQUEST: "LOCATIONS__SERVICES__GET__REQUEST",
  SERVICES__GET__SUCCESS: "LOCATIONS__SERVICES__GET__SUCCESS",
  SERVICES__GET__FAILURE: "LOCATIONS__SERVICES__GET__FAILURE",

  SHOPS__GET__REQUEST: "LOCATIONS__SHOPS__GET__REQUEST",
  SHOPS__GET__SUCCESS: "LOCATIONS__SHOPS__GET__SUCCESS",
  SHOPS__GET__FAILURE: "LOCATIONS__SHOPS__GET__FAILURE",

  SELECTED__GET__REQUEST: "LOCATION__SELECTED__GET__REQUEST",
  SELECTED__GET__SUCCESS: "LOCATION__SELECTED__GET__SUCCESS",
  SELECTED__GET__FAILURE: "LOCATION__SELECTED__GET__FAILURE",
  SELECTED__CLEAR: "LOCATION__SELECTED__CLEAR",
}

export const toggle = action(types.TOGGLE, payload<keyof IFiltersState>())
export const reset = action(types.RESET)

export const pollingCurrentStart = action(types.CURRENT__POLLING__START)
export const pollingCurrentStop = action(types.CURRENT__POLLING__STOP)

type TRequiredCurrentState = Required<ICurrentState>
export const requestGetCurrent = action(types.CURRENT__GET__REQUEST)
export const successGetCurrent = action(types.CURRENT__GET__SUCCESS, payload<TRequiredCurrentState["data"]>())
export const failureGetCurrent = action(types.CURRENT__GET__FAILURE, payload<TRequiredCurrentState["error"]>())

type TRequiredParkingsState = Required<IParkingsState>
export const requestGetParkings = action(types.PARKINGS__GET__REQUEST)
export const successGetParkings = action(types.PARKINGS__GET__SUCCESS, payload<TRequiredParkingsState["data"]>())
export const failureGetParkings = action(types.PARKINGS__GET__FAILURE, payload<TRequiredParkingsState["error"]>())

type TRequiredServicesState = Required<IServicesState>
export const requestGetServices = action(types.SERVICES__GET__REQUEST)
export const successGetServices = action(types.SERVICES__GET__SUCCESS, payload<TRequiredServicesState["data"]>())
export const failureGetServices = action(types.SERVICES__GET__FAILURE, payload<TRequiredServicesState["error"]>())

type TRequiredShopsState = Required<IShopsState>
export const requestGetShops = action(types.SHOPS__GET__REQUEST)
export const successGetShops = action(types.SHOPS__GET__SUCCESS, payload<TRequiredShopsState["data"]>())
export const failureGetShops = action(types.SHOPS__GET__FAILURE, payload<TRequiredShopsState["error"]>())

type TRequiredSelectedState = Required<ISelectedState>
type TRequestGetSelectedPayload = { entity: TRequiredSelectedState["entity"]; uuid: TRequiredLocation["uuid"] }
export const requestGetSelected = action(types.SELECTED__GET__REQUEST, payload<TRequestGetSelectedPayload>())
export const successGetSelected = action(types.SELECTED__GET__SUCCESS, payload<TRequiredSelectedState["data"]>())
export const failureGetSelected = action(types.SELECTED__GET__FAILURE, payload<TRequiredSelectedState["error"]>())
export const clearSelected = action(types.SELECTED__CLEAR)
