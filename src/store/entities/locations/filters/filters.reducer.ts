import { reducer, on } from "ts-action"

import { Actions } from "./filters.actions"

export interface IState {
  current: boolean
  events: boolean
  parkings: boolean
  services: boolean
  shops: boolean
}

export const initialState: IState = {
  current: false,
  events: false,
  parkings: true,
  services: true,
  shops: true,
}

export default reducer(
  initialState,
  on(Actions.toggle, (state, { payload }) => ({ ...state, [payload]: !state[payload] })),
  on(Actions.reset, () => initialState),
)
