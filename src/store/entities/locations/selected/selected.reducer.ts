import { reducer, on } from "ts-action"
import { LocationModel } from "@ciclismurban/models"

import { TAcceptedEntity } from "./selected.types"
import * as Actions from "./selected.actions"

export interface IState {
  fetching: boolean
  entity?: TAcceptedEntity
  data?: LocationModel
  error?: boolean
}

export const initialState: IState = {
  fetching: false,
}

export default reducer(
  initialState,
  on(Actions.Get.request, (state, { payload }) => ({ ...state, entity: payload.entity, fetching: true })),
  on(Actions.Get.success, Actions.set, (state, { payload }) => ({
    ...initialState,
    data: payload,
  })),
  on(Actions.Get.failure, state => ({ ...initialState, error: true })),
  on(Actions.clear, () => initialState),
)
