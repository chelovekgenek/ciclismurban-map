import { reducer, on } from "ts-action"

import { LocationModel } from "models/location"

import { ParkingsActions } from "../actions"

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
  on(ParkingsActions.requestGet, state => ({ ...state, fetching: true })),
  on(ParkingsActions.successGet, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(ParkingsActions.failureGet, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
