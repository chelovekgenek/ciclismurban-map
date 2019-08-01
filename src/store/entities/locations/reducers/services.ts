import { reducer, on } from "ts-action"
import { requestGetServices, successGetServices, failureGetServices } from "../actions"
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
  on(requestGetServices, state => ({ ...state, fetching: true })),
  on(successGetServices, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(failureGetServices, (state, { payload }) => ({ ...state, fetching: false, error: payload })),
)
