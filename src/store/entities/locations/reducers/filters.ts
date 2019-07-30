import { reducer, on } from "ts-action"
import { toggle, reset } from "../actions"

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
  on(toggle, (state, { payload }) => ({ ...state, [payload]: !state[payload] })),
  on(reset, () => initialState),
)
