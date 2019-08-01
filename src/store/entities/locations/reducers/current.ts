import { reducer, on } from "ts-action"
import {
  pollingCurrentStart,
  pollingCurrentStop,
  requestGetCurrent,
  successGetCurrent,
  failureGetCurrent,
} from "../actions"
import { IPoint } from "../interface"

export interface IState {
  polling: boolean
  fetching: boolean
  data?: IPoint
  error?: Error
}

const initialState: IState = {
  polling: false,
  fetching: false,
}

export default reducer(
  initialState,
  on(pollingCurrentStart, state => ({ ...state, polling: true })),
  on(pollingCurrentStop, () => initialState),
  on(requestGetCurrent, state => ({ ...state, fetching: true })),
  on(successGetCurrent, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(failureGetCurrent, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
