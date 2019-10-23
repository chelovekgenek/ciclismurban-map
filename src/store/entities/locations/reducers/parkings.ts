import { reducer, on } from "ts-action"

import { ParkingModel } from "models/location"

import { ParkingsGetActions, ParkingsCreateActions, ParkingsUpdateActions, ParkingsDeleteActions } from "../actions"

export interface IState {
  data: ParkingModel[]
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
    ParkingsGetActions.request,
    ParkingsCreateActions.request,
    ParkingsUpdateActions.request,
    ParkingsDeleteActions.request,
    (state: IState) => ({
      ...state,
      fetching: true,
    }),
  ),
  on(
    ParkingsGetActions.failure,
    ParkingsCreateActions.failure,
    ParkingsUpdateActions.request,
    ParkingsDeleteActions.failure,
    (state: IState, { payload }: any) => ({
      ...state,
      fetching: false,
      error: payload,
    }),
  ),
  on(ParkingsGetActions.success, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(ParkingsCreateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.concat(payload),
  })),
  on(ParkingsUpdateActions.success, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: state.data.map(item => (item.uuid === payload.uuid ? payload : item)),
  })),
  on(ParkingsDeleteActions.success, (state, { payload }) => ({
    ...state,
    data: state.data.filter(item => item.uuid !== payload),
    fetching: false,
  })),
)
