import { reducer, on } from "ts-action"

import { ServiceModel } from "models/location"

import { ServicesGetActions, ServicesCreateActions, ServicesUpdateActions, ServicesDeleteActions } from "../actions"

export interface IState {
  data: ServiceModel[]
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
    ServicesGetActions.request,
    ServicesCreateActions.request,
    ServicesUpdateActions.request,
    ServicesDeleteActions.request,
    (state: IState) => ({
      ...state,
      fetching: true,
    }),
  ),
  on(
    ServicesGetActions.failure,
    ServicesCreateActions.failure,
    ServicesUpdateActions.request,
    ServicesDeleteActions.failure,
    (state: IState, { payload }: any) => ({
      ...state,
      fetching: false,
      error: payload,
    }),
  ),
  on(ServicesGetActions.success, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(ServicesCreateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.concat(payload),
  })),
  on(ServicesUpdateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.map(item => (item.uuid === payload.uuid ? payload : item)),
  })),
  on(ServicesDeleteActions.success, (state, { payload }) => ({
    ...state,
    data: state.data.filter(item => item.uuid !== payload),
    fetching: false,
  })),
)
