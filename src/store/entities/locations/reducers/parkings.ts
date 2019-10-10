import { reducer, on } from "ts-action"

import { LocationModel } from "models/location"

import { ParkingsGetActions } from "../actions"

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
  on(ParkingsGetActions.request, state => ({ ...state, fetching: true })),
  on(ParkingsGetActions.success, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(ParkingsGetActions.failure, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
