import { request } from "helpers"
import { RegisterActions, LoginActions, LoginByGoogleActions } from "./actions"

export const register = async (params: ReturnType<typeof RegisterActions.request>["payload"]) =>
  request.post("/auth/register", params)

export const login = async (params: ReturnType<typeof LoginActions.request>["payload"]) =>
  request.post("/auth/login", params)

export const loginByToken = async () => request.post("/auth/login/token")

export const loginByGoogle = async (token: ReturnType<typeof LoginByGoogleActions.request>["payload"]) =>
  request.post("/auth/login/google", undefined, {
    headers: {
      "Authorization-Google": token,
    },
  })
