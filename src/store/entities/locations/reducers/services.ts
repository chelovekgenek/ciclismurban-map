import { reducer, on } from "ts-action"

import { LocationModel } from "models/location"

import { ServicesActions } from "../actions"

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
  on(ServicesActions.requestGet, state => ({ ...state, fetching: true })),
  on(ServicesActions.successGet, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(ServicesActions.failureGet, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
