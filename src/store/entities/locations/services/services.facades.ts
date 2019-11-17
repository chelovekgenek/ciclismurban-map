import { request } from "helpers"
import { ServiceModel } from "@ciclismurban/models"

export const getAll = async () => request.get("/services")

export const create = async (payload: Partial<ServiceModel>) => request.post("/me/services", payload)
export const updateById = async (id: string, payload: Partial<ServiceModel>) =>
  request.patch(`/me/services/${id}`, payload)
export const deleteById = async (id: string) => request.delete(`/me/services/${id}`)
