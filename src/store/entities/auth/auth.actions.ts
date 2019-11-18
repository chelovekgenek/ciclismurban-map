import { action, payload } from "ts-action"

import { LoginForm } from "components/pages/Login/LoginForm.scheme"

import * as Types from "./auth.types"
import { IState } from "./auth.reducer"

export type TRequiredState = Required<IState>

type TLoginRequestPayload = LoginForm
type TLoginSuccessPayload = Types.AuthResponseModel
type TLoginFailurePayload = TRequiredState["error"]

export const Login = {
  request: action(Types.Login.REQUEST, payload<TLoginRequestPayload>()),
  success: action(Types.Login.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(Types.Login.FAILURE, payload<TLoginFailurePayload>()),
}

export const LoginByToken = {
  request: action(Types.LoginByToken.REQUEST),
  success: action(Types.LoginByToken.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(Types.LoginByToken.FAILURE),
}

export const LoginByGoogle = {
  request: action(Types.LoginByGoogle.REQUEST, payload<string>()),
  success: action(Types.LoginByGoogle.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(Types.LoginByGoogle.FAILURE),
}

export const LoginByFacebook = {
  request: action(Types.LoginByFacebook.REQUEST, payload<string>()),
  success: action(Types.LoginByFacebook.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(Types.LoginByFacebook.FAILURE),
}

export const Register = {
  request: action(Types.Register.REQUEST, payload<TLoginRequestPayload>()),
  success: action(Types.Register.SUCCESS, payload<TLoginSuccessPayload>()),
  failure: action(Types.Register.FAILURE, payload<TLoginFailurePayload>()),
}

export const Logout = action(Types.Logout)
