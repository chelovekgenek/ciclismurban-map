import { reducer, on } from "ts-action"
import { FiltersActions } from "../actions"

export interface IState {
  current: boolean
  events: boolean
  parkings: boolean
  services: boolean
  shops: boolean
}

const initialState: IState = {
  current: false,
  events: false,
  parkings: true,
  services: true,
  shops: true,
}

export default reducer(
  initialState,
  on(FiltersActions.toggle, (state, { payload }) => ({ ...state, [payload]: !state[payload] })),
  on(FiltersActions.reset, () => initialState),
)
