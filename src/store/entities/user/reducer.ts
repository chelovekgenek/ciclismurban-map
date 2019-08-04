import { reducer, on } from "ts-action"

import { UserModel } from "models/user"

import { RegisterActions, LoginActions, LoginByTokenActions, LogoutAction } from "./actions"

export interface IState {
  authenticated: boolean
  fetching: boolean
  token?: string
  data?: UserModel
  error?: number
}

const initialState: IState = {
  authenticated: false,
  fetching: false,
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
    authenticated: true,
    ...payload,
  })),
  on(RegisterActions.failure, LoginActions.failure, (_state, { payload }) => ({
    ...initialState,
    error: payload,
  })),
  on(LoginByTokenActions.failure, LogoutAction, () => initialState),
)
