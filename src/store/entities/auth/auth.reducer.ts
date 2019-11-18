import { reducer, on, union } from "ts-action"

import * as Actions from "./auth.actions"

export interface IState {
  authenticated: boolean
  fetching: boolean
  attempts: number
  token?: string
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
      Actions.Register.request,
      Actions.Login.request,
      Actions.LoginByToken.request,
      Actions.LoginByGoogle.request,
      Actions.LoginByFacebook.request,
    ),
    state => ({
      ...state,
      error: undefined,
      fetching: true,
    }),
  ),
  on(
    ...union(
      Actions.Register.success,
      Actions.Login.success,
      Actions.LoginByToken.success,
      Actions.LoginByGoogle.success,
      Actions.LoginByFacebook.success,
    ),
    (state, { payload }) => ({
      ...initialState,
      attempts: state.attempts + 1,
      authenticated: true,
      ...payload,
    }),
  ),
  on(Actions.Register.failure, Actions.Login.failure, (state, { payload }) => ({
    ...initialState,
    attempts: state.attempts + 1,
    error: payload,
  })),
  on(
    ...union(
      Actions.LoginByToken.failure,
      Actions.LoginByGoogle.failure,
      Actions.LoginByFacebook.failure,
      Actions.Logout,
    ),
    () => initialState,
  ),
)
