import { request } from "helpers"

export const getEventById = async (id: string) => request.get(`/events/${id}`)
export const getParkingById = async (id: string) => request.get(`/parkings/${id}`)
export const getServiceById = async (id: string) => request.get(`/services/${id}`)
export const getShopById = async (id: string) => request.get(`/shops/${id}`)
