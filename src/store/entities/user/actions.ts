import { action, payload } from "ts-action"

import { RegisterTypes, LoginTypes, LoginByTokenTypes, LogoutType } from "./types"
import { IState } from "./reducer"
import { AuthResponseModel, LoginForm } from "models/user"

export type TRequiredState = Required<IState>

type TLoginRequestPayload = LoginForm
type TLoginSuccessPayload = AuthResponseModel
type TLoginFailurePayload = TRequiredState["error"]

export const LoginActions = {
  request: action(LoginTypes.REQUEST, payload<TLoginRequestPayload>()),
  success: action(LoginTypes.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(LoginTypes.FAILURE, payload<TLoginFailurePayload>()),
}

export const LoginByTokenActions = {
  request: action(LoginByTokenTypes.REQUEST),
  success: action(LoginByTokenTypes.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(LoginByTokenTypes.FAILURE),
}

export const RegisterActions = {
  request: action(RegisterTypes.REQUEST, payload<TLoginRequestPayload>()),
  success: action(RegisterTypes.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(RegisterTypes.FAILURE, payload<TLoginFailurePayload>()),
}

export const LogoutAction = action(LogoutType)
