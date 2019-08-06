import { action, payload } from "ts-action"

import { IState as IFiltersState } from "../reducers/filters"

export enum FiltersTypes {
  TOGGLE = "LOCATIONS__FILTERS__TOGGLE",
  RESET = "LOCATIONS__FILTERS__RESET",
}

export const FiltersActions = {
  toggle: action(FiltersTypes.TOGGLE, payload<keyof IFiltersState>()),
  reset: action(FiltersTypes.RESET),
}
