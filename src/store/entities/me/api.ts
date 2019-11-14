import { request } from "helpers"
import { UserModel, ProfileModel } from "@ciclismurban/models"
import { AxiosResponse } from "axios"

export const getMe = async (): Promise<UserModel> => request.get("/me")
export const updateMeProfile = async (payload: Partial<ProfileModel>): Promise<AxiosResponse<UserModel>> =>
  request.patch("/me/profile", payload)
