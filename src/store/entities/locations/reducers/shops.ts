import { reducer, on, union } from "ts-action"
import { ShopModel } from "@ciclismurban/models"

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
    ...union(
      ShopsGetActions.request,
      ShopsCreateActions.request,
      ShopsUpdateActions.request,
      ShopsDeleteActions.request,
    ),
    state => ({
      ...state,
      fetching: true,
    }),
  ),
  on(
    ...union(
      ShopsGetActions.failure,
      ShopsCreateActions.failure,
      ShopsUpdateActions.failure,
      ShopsDeleteActions.failure,
    ),
    (state, { payload }) => ({
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
