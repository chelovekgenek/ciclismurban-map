import { reducer, on } from "ts-action"

import { EventModel } from "models/location"

import { EventsActions } from "../actions"

export interface IState {
  data: EventModel[]
  fetching: boolean
  error?: Error
}

const initialState: IState = {
  data: [],
  fetching: false,
}

export default reducer(
  initialState,
  on(EventsActions.requestGet, EventsActions.requestCreate, EventsActions.requestDelete, state => ({
    ...state,
    fetching: true,
  })),
  on(EventsActions.failureGet, EventsActions.failureCreate, EventsActions.failureDelete, (state, { payload }) => ({
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
  on(EventsActions.successDelete, (state, { payload }) => ({
    ...state,
    data: state.data.filter(item => item.uuid !== payload),
    fetching: false,
  })),
)
