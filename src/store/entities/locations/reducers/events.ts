import { reducer, on, union } from "ts-action"

import { EventModel } from "models/location"

import { EventsGetActions, EventsCreateActions, EventsDeleteActions, EventsUpdateActions } from "../actions"

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
  on(
    ...union(
      EventsGetActions.request,
      EventsCreateActions.request,
      EventsUpdateActions.request,
      EventsDeleteActions.request,
    ),
    state => ({
      ...state,
      fetching: true,
    }),
  ),
  on(
    ...union(
      EventsGetActions.failure,
      EventsCreateActions.failure,
      EventsUpdateActions.failure,
      EventsDeleteActions.failure,
    ),
    (state, { payload }) => ({
      ...state,
      fetching: false,
      error: payload,
    }),
  ),
  on(EventsGetActions.success, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(EventsCreateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.concat(payload),
  })),
  on(EventsUpdateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.map(item => (item.uuid === payload.uuid ? payload : item)),
  })),
  on(EventsDeleteActions.success, (state, { payload }) => ({
    ...state,
    data: state.data.filter(item => item.uuid !== payload),
    fetching: false,
  })),
)
