import { reducer, on } from "ts-action"
import { PointModel } from "models/location"

import { CurrentActions } from "../actions"

export interface IState {
  polling: boolean
  fetching: boolean
  data?: PointModel
  error?: Error
}

const initialState: IState = {
  polling: false,
  fetching: false,
}

export default reducer(
  initialState,
  on(CurrentActions.pollingStart, state => ({ ...state, polling: true })),
  on(CurrentActions.pollingStop, () => initialState),
  on(CurrentActions.requestGet, state => ({ ...state, fetching: true })),
  on(CurrentActions.successGet, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(CurrentActions.failureGet, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
