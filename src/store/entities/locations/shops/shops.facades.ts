import { request } from "helpers"
import { ShopModel } from "@ciclismurban/models"

export const getAll = async () => request.get("/shops")
export const create = async (payload: Partial<ShopModel>) => request.post("/me/shops", payload)
export const updateById = async (id: string, payload: Partial<ShopModel>) => request.patch(`/me/shops/${id}`, payload)
export const deleteById = async (id: string) => request.delete(`/me/shops/${id}`)
