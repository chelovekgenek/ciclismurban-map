import { reducer, on } from "ts-action"

import { requestGetShops, successGetShops, failureGetShops } from "../actions"
import { ILocation } from "../interface"

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
  on(requestGetShops, state => ({ ...state, fetching: true })),
  on(successGetShops, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(failureGetShops, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
