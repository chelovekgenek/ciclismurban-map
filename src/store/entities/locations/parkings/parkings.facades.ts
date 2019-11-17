import { ParkingModel } from "@ciclismurban/models"
import { request } from "helpers"

export const getAll = async () => request.get("/parkings")
export const create = async (payload: Partial<ParkingModel>) => request.post("/me/parkings", payload)
export const updateById = async (id: ParkingModel["uuid"], payload: Partial<ParkingModel>) =>
  request.patch(`/me/parkings/${id}`, payload)
export const deleteById = async (id: ParkingModel["uuid"]) => request.delete(`/me/parkings/${id}`)
