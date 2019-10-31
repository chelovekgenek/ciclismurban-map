import { reducer, on, union } from "ts-action"

import { UserModel } from "models/user"

import { RegisterActions, LoginActions, LoginByTokenActions, LogoutAction, LoginByGoogleActions } from "./actions"

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
    ...union(RegisterActions.request, LoginActions.request, LoginByTokenActions.request, LoginByGoogleActions.request),
    state => ({
      ...state,
      error: undefined,
      fetching: true,
    }),
  ),
  on(
    ...union(RegisterActions.success, LoginActions.success, LoginByTokenActions.success, LoginByGoogleActions.success),
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
  on(LoginByTokenActions.failure, LoginByGoogleActions.failure, LogoutAction, () => initialState),
)
