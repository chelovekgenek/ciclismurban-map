import { request } from "helpers"
import { EventModel } from "@ciclismurban/models"

export const getAll = async () => request.get("/events")

export const getById = async (id: string) => request.get(`/events/${id}`)

export const create = async (payload: Partial<EventModel>) => request.post("/me/events", payload)

export const updateById = async (id: string, payload: Partial<EventModel>) => request.patch(`/me/events/${id}`, payload)

export const deleteById = async (id: string) => request.delete(`/me/events/${id}`)
