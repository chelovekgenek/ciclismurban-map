import { request, packToken } from "helpers"
import * as action from "./actions"

export const register = async (params: ReturnType<typeof action.RegisterActions.request>["payload"]) =>
  request.post("/auth/register", params)

export const login = async (params: ReturnType<typeof action.LoginActions.request>["payload"]) =>
  request.post("/auth/login", params)

export const loginByToken = async () => request.post("/auth/login/token")

export const loginByGoogle = async (token: ReturnType<typeof action.LoginByGoogleActions.request>["payload"]) =>
  request.post("/auth/login/google", undefined, {
    headers: packToken(token),
  })

export const loginByFacebook = async (token: ReturnType<typeof action.LoginByFacebookActions.request>["payload"]) =>
  request.post("/auth/login/facebook", undefined, {
    headers: packToken(token),
  })
