import { reducer, on } from "ts-action"

import { LocationModel } from "models/location"

import { ShopsActions } from "../actions"

export interface IState {
  data: LocationModel[]
  fetching: boolean
  error?: Error
}

const initialState: IState = {
  data: [],
  fetching: false,
}

export default reducer(
  initialState,
  on(ShopsActions.requestGet, state => ({ ...state, fetching: true })),
  on(ShopsActions.successGet, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(ShopsActions.failureGet, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
