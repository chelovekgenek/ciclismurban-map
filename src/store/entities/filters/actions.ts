import { action, payload } from "ts-action"

import { IState } from "./reducer"

export const types = {
  TOGGLE: "FILTERS__TOGGLE",
  RESET: "FILTERS__RESET",
}

export const toggle = action(types.TOGGLE, payload<keyof IState>())
export const reset = action(types.RESET)
