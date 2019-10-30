import { reducer, on } from "ts-action"

import { UserModel } from "models/user"

import { RegisterActions, LoginActions, LoginByTokenActions, LogoutAction } from "./actions"

export interface IState {
  authenticated: boolean
  fetching: boolean
  attempts: number
  token?: string
  data?: UserModel
  error?: number
}

const initialState: IState = {
  authenticated: false,
  fetching: false,
  attempts: 0,
}

export default reducer(
  initialState,
  on(RegisterActions.request, LoginActions.request, LoginByTokenActions.request, state => ({
    ...state,
    error: undefined,
    fetching: true,
  })),
  on(RegisterActions.success, LoginActions.success, LoginByTokenActions.success, (state, { payload }) => ({
    ...initialState,
    attempts: state.attempts + 1,
    authenticated: true,
    ...payload,
  })),
  on(RegisterActions.failure, LoginActions.failure, (state, { payload }) => ({
    ...initialState,
    attempts: state.attempts + 1,
    error: payload,
  })),
  on(LoginByTokenActions.failure, LogoutAction, () => initialState),
)
