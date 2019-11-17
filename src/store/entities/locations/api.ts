import { request } from "helpers"
import { ShopModel } from "@ciclismurban/models"

export const getShops = async () => request.get("/shops")

export const getEventById = async (id: string) => request.get(`/events/${id}`)
export const getParkingById = async (id: string) => request.get(`/parkings/${id}`)
export const getServiceById = async (id: string) => request.get(`/services/${id}`)
export const getShopById = async (id: string) => request.get(`/shops/${id}`)

export const createShop = async (payload: Partial<ShopModel>) => request.post("/me/shops", payload)
export const updateShop = async (id: string, payload: Partial<ShopModel>) => request.patch(`/me/shops/${id}`, payload)
export const deleteShop = async (id: string) => request.delete(`/me/shops/${id}`)
