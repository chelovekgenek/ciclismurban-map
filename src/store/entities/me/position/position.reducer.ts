import { reducer, on } from "ts-action"
import { PointModel } from "@ciclismurban/models"

import * as Actions from "./position.actions"

export interface IState {
  polling: boolean
  fetching: boolean
  data?: PointModel
  error?: boolean
}

const initialState: IState = {
  polling: false,
  fetching: false,
}

export default reducer(
  initialState,
  on(Actions.Polling.start, state => ({ ...state, polling: true })),
  on(Actions.Polling.stop, () => initialState),
  on(Actions.Get.request, state => ({ ...state, fetching: true })),
  on(Actions.Get.success, (state, { payload }) => ({ ...state, fetching: false, data: payload })),
  on(Actions.Get.failure, state => ({ ...state, fetching: false, error: true })),
)
