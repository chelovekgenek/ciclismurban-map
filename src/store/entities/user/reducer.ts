import { reducer, on, union } from "ts-action"
import { UserModel } from "@ciclismurban/models"

import {
  RegisterActions,
  LoginActions,
  LoginByTokenActions,
  LogoutAction,
  LoginByGoogleActions,
  LoginByFacebookActions,
} from "./actions"

export interface IState {
  authenticated: boolean
  fetching: boolean
  attempts: number
  token?: string
  data?: UserModel
  error?: number
}

export const initialState: IState = {
  authenticated: false,
  fetching: false,
  attempts: 0,
}

export default reducer(
  initialState,
  on(
    ...union(
      RegisterActions.request,
      LoginActions.request,
      LoginByTokenActions.request,
      LoginByGoogleActions.request,
      LoginByFacebookActions.request,
    ),
    state => ({
      ...state,
      error: undefined,
      fetching: true,
    }),
  ),
  on(
    ...union(
      RegisterActions.success,
      LoginActions.success,
      LoginByTokenActions.success,
      LoginByGoogleActions.success,
      LoginByFacebookActions.success,
    ),
    (state, { payload }) => ({
      ...initialState,
      attempts: state.attempts + 1,
      authenticated: true,
      ...payload,
    }),
  ),
  on(RegisterActions.failure, LoginActions.failure, (state, { payload }) => ({
    ...initialState,
    attempts: state.attempts + 1,
    error: payload,
  })),
  on(
    ...union(LoginByTokenActions.failure, LoginByGoogleActions.failure, LoginByFacebookActions.failure, LogoutAction),
    () => initialState,
  ),
)
