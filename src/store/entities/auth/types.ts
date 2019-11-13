export enum RegisterTypes {
  REQUEST = "AUTH__REGISTER__REQUEST",
  SUCCESS = "AUTH__REGISTER__SUCCESS",
  FAILURE = "AUTH__REGISTER__FAILURE",
}

export enum LoginTypes {
  REQUEST = "AUTH__LOGIN__REQUEST",
  SUCCESS = "AUTH__LOGIN__SUCCESS",
  FAILURE = "AUTH__LOGIN__FAILURE",
}

export enum LoginByTokenTypes {
  REQUEST = "AUTH__LOGIN__TOKEN__REQUEST",
  SUCCESS = "AUTH__LOGIN__TOKEN__SUCCESS",
  FAILURE = "AUTH__LOGIN__TOKEN__FAILURE",
}

export enum LoginByGoogleTypes {
  REQUEST = "AUTH__LOGIN__GOOGLE__REQUEST",
  SUCCESS = "AUTH__LOGIN__GOOGLE__SUCCESS",
  FAILURE = "AUTH__LOGIN__GOOGLE__FAILURE",
}

export enum LoginByFacebookTypes {
  REQUEST = "AUTH__LOGIN__FACEBOOK__REQUEST",
  SUCCESS = "AUTH__LOGIN__FACEBOOK__SUCCESS",
  FAILURE = "AUTH__LOGIN__FACEBOOK__FAILURE",
}

export const LogoutType = "AUTH__LOGOUT"

export interface AuthResponseModel {
  token: string
}
