import { action, payload } from "ts-action"

import { IState as IFiltersState } from "./reducers/filters"
import { IState as ICurrentState } from "./reducers/current"

export const types = {
  TOGGLE: "LOCATIONS__FILTERS__TOGGLE",
  RESET: "LOCATIONS__FILTERS__RESET",

  CURRENT__POLLING__START: "LOCATIONS__CURRENT__POLLING__START",
  CURRENT__POLLING__STOP: "LOCATIONS__CURRENT__POLLING__STOP",

  CURRENT__GET__REQUEST: "LOCATIONS__CURRENT__GET__REQUEST",
  CURRENT__GET__SUCCESS: "LOCATIONS__CURRENT__GET__SUCCESS",
  CURRENT__GET__FAILURE: "LOCATIONS__CURRENT__GET__FAILURE",
}

export const toggle = action(types.TOGGLE, payload<keyof IFiltersState>())
export const reset = action(types.RESET)

export const pollingCurrentStart = action(types.CURRENT__POLLING__START)
export const pollingCurrentStop = action(types.CURRENT__POLLING__STOP)

export const requestGetCurrent = action(types.CURRENT__GET__REQUEST)
export const successGetCurrent = action(types.CURRENT__GET__SUCCESS, payload<Required<ICurrentState>["data"]>())
export const failureGetCurrent = action(types.CURRENT__GET__FAILURE, payload<Required<ICurrentState>["error"]>())
