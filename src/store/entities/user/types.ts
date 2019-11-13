export enum RegisterTypes {
  REQUEST = "USER__REGISTER__REQUEST",
  SUCCESS = "USER__REGISTER__SUCCESS",
  FAILURE = "USER__REGISTER__FAILURE",
}

export enum LoginTypes {
  REQUEST = "USER__LOGIN__REQUEST",
  SUCCESS = "USER__LOGIN__SUCCESS",
  FAILURE = "USER__LOGIN__FAILURE",
}

export enum LoginByTokenTypes {
  REQUEST = "USER__LOGIN__TOKEN__REQUEST",
  SUCCESS = "USER__LOGIN__TOKEN__SUCCESS",
  FAILURE = "USER__LOGIN__TOKEN__FAILURE",
}

export enum LoginByGoogleTypes {
  REQUEST = "USER__LOGIN__GOOGLE__REQUEST",
  SUCCESS = "USER__LOGIN__GOOGLE__SUCCESS",
  FAILURE = "USER__LOGIN__GOOGLE__FAILURE",
}

export enum LoginByFacebookTypes {
  REQUEST = "USER__LOGIN__FACEBOOK__REQUEST",
  SUCCESS = "USER__LOGIN__FACEBOOK__SUCCESS",
  FAILURE = "USER__LOGIN__FACEBOOK__FAILURE",
}

export const LogoutType = "USER__LOGOUT"

export interface AuthResponseModel {
  token: string
}
