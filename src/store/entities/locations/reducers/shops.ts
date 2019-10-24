import { reducer, on } from "ts-action"

import { ShopModel } from "models/location"

import { ShopsGetActions, ShopsCreateActions, ShopsUpdateActions, ShopsDeleteActions } from "../actions"

export interface IState {
  data: ShopModel[]
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
    ShopsGetActions.request,
    ShopsCreateActions.request,
    ShopsUpdateActions.request,
    ShopsDeleteActions.request,
    (state: IState) => ({
      ...state,
      fetching: true,
    }),
  ),
  on(
    ShopsGetActions.failure,
    ShopsCreateActions.failure,
    ShopsUpdateActions.request,
    ShopsDeleteActions.failure,
    (state: IState, { payload }: any) => ({
      ...state,
      fetching: false,
      error: payload,
    }),
  ),
  on(ShopsGetActions.success, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(ShopsCreateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.concat(payload),
  })),
  on(ShopsUpdateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.map(item => (item.uuid === payload.uuid ? payload : item)),
  })),
  on(ShopsDeleteActions.success, (state, { payload }) => ({
    ...state,
    data: state.data.filter(item => item.uuid !== payload),
    fetching: false,
  })),
)
