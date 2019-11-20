import { request } from "helpers"
import { UserModel, ProfileModel, PointModel } from "@ciclismurban/models"

export const get = async (): Promise<UserModel> => request.get("/me")
export const updateProfile = async (payload: Partial<ProfileModel>) => request.patch("/me/profile", payload)
export const updatePosition = async (payload: PointModel): Promise<UserModel> => request.put("/me/position", payload)
