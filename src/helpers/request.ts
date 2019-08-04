import axios from "axios"
import { getToken } from "store/entities/user"

export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
})

request.interceptors.request.use(config => {
  const { store } = require("store")

  const token = getToken(store.getState())

  if (token) {
    config.headers["Authorization"] = token
  }

  return config
})
