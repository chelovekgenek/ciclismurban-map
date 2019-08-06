import { reducer, on } from "ts-action"

import { LocationModel } from "models/location"

import { EventsActions } from "../actions"

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
  on(EventsActions.requestGet, EventsActions.requestCreate, state => ({ ...state, fetching: true })),
  on(EventsActions.failureGet, EventsActions.failureCreate, (state, { payload }) => ({
    ...state,
    fetching: false,
    error: payload,
  })),
  on(EventsActions.successGet, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(EventsActions.successCreate, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.concat(payload),
  })),
)
