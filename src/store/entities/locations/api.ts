import { request } from "helpers"

export const getParkings = async () => request.get("/parkings")
export const getServices = async () => request.get("/services")
export const getShops = async () => request.get("/shops")

export const getParkingById = async (id: string) => request.get(`/parkings/${id}`)
export const getServiceById = async (id: string) => request.get(`/services/${id}`)
export const getShopById = async (id: string) => request.get(`/shops/${id}`)