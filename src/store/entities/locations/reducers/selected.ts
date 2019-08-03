import { reducer, on } from "ts-action"

import { TAcceptedEntity } from "../types"
import { SelectedActions } from "../actions"
import { LocationModel } from "models/location"

export interface IState {
  fetching: boolean
  entity?: TAcceptedEntity
  data?: LocationModel
  error?: Error
}

const initialState: IState = {
  fetching: false,
}

export default reducer(
  initialState,
  on(SelectedActions.requestGet, (state, { payload }) => ({ ...state, entity: payload.entity, fetching: true })),
  on(SelectedActions.successGet, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: payload,
    error: undefined,
  })),
  on(SelectedActions.failureGet, (state, { payload }) => ({ ...initialState, error: payload })),
  on(SelectedActions.clear, () => initialState),
)
