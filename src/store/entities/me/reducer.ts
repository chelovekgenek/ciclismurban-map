import { reducer, on } from "ts-action"
import { UserModel } from "@ciclismurban/models"

import { MeGetActions, MeUpdateProfileActions } from "./actions"
import { LogoutAction } from "../auth"

export interface IState {
  fetching: boolean
  data?: UserModel
  error?: number
}

export const initialState: IState = {
  fetching: false,
}

export default reducer(
  initialState,
  on(MeGetActions.request, MeUpdateProfileActions.request, state => ({
    ...state,
    error: undefined,
    fetching: true,
  })),
  on(MeGetActions.success, MeUpdateProfileActions.success, (state, { payload }) => ({
    ...initialState,
    data: payload,
  })),
  on(MeGetActions.failure, MeUpdateProfileActions.failure, state => ({
    ...state,
    fetching: false,
    error: undefined,
  })),
  on(LogoutAction, () => initialState),
)
