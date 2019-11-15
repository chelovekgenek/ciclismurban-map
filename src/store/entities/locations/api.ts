import { request } from "helpers"
import { EventModel, ParkingModel, ServiceModel, ShopModel } from "@ciclismurban/models"

export const getEvents = async () => request.get("/events")
export const getParkings = async () => request.get("/parkings")
export const getServices = async () => request.get("/services")
export const getShops = async () => request.get("/shops")

export const getEventById = async (id: string) => request.get(`/events/${id}`)
export const getParkingById = async (id: string) => request.get(`/parkings/${id}`)
export const getServiceById = async (id: string) => request.get(`/services/${id}`)
export const getShopById = async (id: string) => request.get(`/shops/${id}`)

export const createEvent = async (payload: Partial<EventModel>) => request.post("/me/events", payload)
export const updateEvent = async (id: string, payload: Partial<EventModel>) =>
  request.patch(`/me/events/${id}`, payload)
export const deleteEvent = async (id: string) => request.delete(`/me/events/${id}`)

export const createParking = async (payload: Partial<ParkingModel>) => request.post("/me/parkings", payload)
export const updateParking = async (id: string, payload: Partial<ParkingModel>) =>
  request.patch(`/me/parkings/${id}`, payload)
export const deleteParking = async (id: string) => request.delete(`/me/parkings/${id}`)

export const createService = async (payload: Partial<ServiceModel>) => request.post("/me/services", payload)
export const updateService = async (id: string, payload: Partial<ServiceModel>) =>
  request.patch(`/me/services/${id}`, payload)
export const deleteService = async (id: string) => request.delete(`/me/services/${id}`)

export const createShop = async (payload: Partial<ShopModel>) => request.post("/me/shops", payload)
export const updateShop = async (id: string, payload: Partial<ShopModel>) => request.patch(`/me/shops/${id}`, payload)
export const deleteShop = async (id: string) => request.delete(`/me/shops/${id}`)
