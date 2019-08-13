import { request } from "helpers"
import { EventsActions } from "./actions"

export const getEvents = async () => request.get("/events")
export const getParkings = async () => request.get("/parkings")
export const getServices = async () => request.get("/services")
export const getShops = async () => request.get("/shops")

export const getEventById = async (id: string) => request.get(`/events/${id}`)
export const getParkingById = async (id: string) => request.get(`/parkings/${id}`)
export const getServiceById = async (id: string) => request.get(`/services/${id}`)
export const getShopById = async (id: string) => request.get(`/shops/${id}`)

export const createEvent = async (payload: ReturnType<typeof EventsActions.requestCreate>["payload"]) =>
  request.post("/events", payload)

export const deleteEvent = async (id: string) => request.delete(`/events/${id}`)

export const uploadFile = async (file: string) => {
  const form = new FormData()
  form.set("file", file)

  return request.post<string>("/files", form, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}
