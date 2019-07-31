import { reducer, on } from "ts-action"

import { requestGetParkings, successGetParkings, failureGetParkings } from "../actions"

export interface IState {
  data: ILocation[]
  fetching: boolean
  error?: Error
}

const initialState: IState = {
  data: [],
  fetching: false,
}

export default reducer(
  initialState,
  on(requestGetParkings, state => ({ ...state, fetching: true })),
  on(successGetParkings, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(failureGetParkings, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
