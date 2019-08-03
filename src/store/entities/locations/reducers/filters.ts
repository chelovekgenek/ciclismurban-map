import { reducer, on } from "ts-action"
import { FiltersActions } from "../actions"

export interface IState {
  current: boolean
  services: boolean
  shops: boolean
  parkings: boolean
}

const initialState: IState = {
  current: false,
  services: true,
  shops: true,
  parkings: true,
}

export default reducer(
  initialState,
  on(FiltersActions.toggle, (state, { payload }) => ({ ...state, [payload]: !state[payload] })),
  on(FiltersActions.reset, () => initialState),
)
