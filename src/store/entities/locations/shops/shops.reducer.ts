import { reducer, on, union } from "ts-action"
import { ShopModel } from "@ciclismurban/models"

import * as Actions from "./shops.actions"

export interface IState {
  data: ShopModel[]
  fetching: boolean
  error?: boolean
}

export const initialState: IState = {
  data: [],
  fetching: false,
}

export default reducer(
  initialState,
  on(...union(Actions.Get.request, Actions.Create.request, Actions.Update.request, Actions.Delete.request), state => ({
    ...state,
    fetching: true,
  })),
  on(...union(Actions.Get.failure, Actions.Create.failure, Actions.Update.failure, Actions.Delete.failure), state => ({
    ...state,
    fetching: false,
    error: true,
  })),
  on(Actions.Get.success, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(Actions.Create.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.concat(payload),
  })),
  on(Actions.Update.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.map(item => (item.uuid === payload.uuid ? payload : item)),
  })),
  on(Actions.Delete.success, (state, { payload }) => ({
    ...state,
    data: state.data.filter(item => item.uuid !== payload),
    fetching: false,
  })),
)
