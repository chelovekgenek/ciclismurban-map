import { reducer, on } from "ts-action"
import { toggle, reset } from "./actions"

export interface IState {
  services: boolean
  shops: boolean
  parkings: boolean
}

const initialState: IState = {
  services: true,
  shops: true,
  parkings: true,
}

export default reducer(
  initialState,
  on(toggle, (state, { payload }) => ({ ...state, [payload]: !state[payload] })),
  on(reset, () => initialState),
)
