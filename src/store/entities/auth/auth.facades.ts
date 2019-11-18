import { UserModel } from "@ciclismurban/models"
import { request, packToken } from "helpers"

export const register = async (params: Partial<UserModel>) => request.post("/auth/register", params)
export const login = async (params: Partial<UserModel>) => request.post("/auth/login", params)
export const loginByToken = async () => request.post("/auth/login/token")
export const loginByGoogle = async (token: string) =>
  request.post("/auth/login/google", undefined, {
    headers: packToken(token),
  })
export const loginByFacebook = async (token: string) =>
  request.post("/auth/login/facebook", undefined, {
    headers: packToken(token),
  })
