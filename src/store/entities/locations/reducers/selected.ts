import { reducer, on } from "ts-action"
import { LocationModel } from "@ciclismurban/models"

import { TAcceptedEntity } from "../types"
import { SelectedActions, SelectedGetActions } from "../actions"

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
  on(SelectedGetActions.request, (state, { payload }) => ({ ...state, entity: payload.entity, fetching: true })),
  on(SelectedGetActions.success, SelectedActions.set, (state, { payload }) => ({
    ...state,
    fetching: false,
    data: payload,
    error: undefined,
  })),
  on(SelectedGetActions.failure, (state, { payload }) => ({ ...initialState, error: payload })),
  on(SelectedActions.clear, () => initialState),
)
