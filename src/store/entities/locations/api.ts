import { request } from "helpers"

export const getParkings = async () => request.get("/locations/parkings")
export const getServices = async () => request.get("/locations/services")
export const getShops = async () => request.get("/locations/shops")
