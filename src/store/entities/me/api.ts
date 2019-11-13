import { request } from "helpers"
import { UserModel } from "@ciclismurban/models"

export const getMe = async (): Promise<UserModel> => request.get("/me")
