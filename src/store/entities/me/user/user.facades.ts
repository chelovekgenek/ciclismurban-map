import { request } from "helpers"
import { UserModel, ProfileModel } from "@ciclismurban/models"

export const get = async (): Promise<UserModel> => request.get("/me")
export const updateProfile = async (payload: Partial<ProfileModel>) => request.patch("/me/profile", payload)
