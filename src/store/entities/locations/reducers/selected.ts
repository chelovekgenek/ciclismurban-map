import { reducer, on } from "ts-action"

import { TAcceptedEntity, TRequiredLocation } from "../interface"
import { requestGetSelected, successGetSelected, failureGetSelected, clearSelected } from "../actions"

export interface IState {
  fetching: boolean
  entity?: TAcceptedEntity
  data?: TRequiredLocation
  error?: Error
}

const initialState: IState = {
  fetching: false,
}

export default reducer(
  initialState,
  on(requestGetSelected, (state, { payload }) => ({ ...state, entity: payload.entity, fetching: true })),
  on(successGetSelected, (state, { payload }) => ({ ...state, fetching: false, data: payload, error: undefined })),
  on(failureGetSelected, (state, { payload }) => ({ ...initialState, error: payload })),
  on(clearSelected, () => initialState),
)
