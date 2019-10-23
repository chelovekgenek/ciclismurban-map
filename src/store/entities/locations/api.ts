import { request } from "helpers"
import { EventModel, ParkingModel } from "models/location"

export const getEvents = async () => request.get("/events")
export const getParkings = async () => request.get("/parkings")
export const getServices = async () => request.get("/services")
export const getShops = async () => request.get("/shops")

export const getEventById = async (id: string) => request.get(`/events/${id}`)
export const getParkingById = async (id: string) => request.get(`/parkings/${id}`)
export const getServiceById = async (id: string) => request.get(`/services/${id}`)
export const getShopById = async (id: string) => request.get(`/shops/${id}`)

export const createEvent = async (payload: Partial<EventModel>) => request.post("/events", payload)
export const updateEvent = async (id: string, payload: Partial<EventModel>) => request.patch(`/events/${id}`, payload)
export const deleteEvent = async (id: string) => request.delete(`/events/${id}`)

export const createParking = async (payload: Partial<ParkingModel>) => request.post("/parkings", payload)
export const updateParking = async (id: string, payload: Partial<ParkingModel>) =>
  request.patch(`/parkings/${id}`, payload)
export const deleteParking = async (id: string) => request.delete(`/parkings/${id}`)

export const uploadFile = async (file: string) => {
  const form = new FormData()
  form.set("file", file)

  return request.post<string>("/files", form, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}
