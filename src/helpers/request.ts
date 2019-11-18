import axios from "axios"
import * as Auth from "store/entities/auth"

export const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
})

request.interceptors.request.use(config => {
  const { store } = require("store")

  const token = Auth.Selectors.getToken(store.getState())

  if (token) {
    Object.assign(config.headers, packToken(token))
  }

  return config
})

request.interceptors.response.use(
  config => config,
  error => {
    if (error.response.status === 401) {
      const { store } = require("store")
      store.dispatch(Auth.Actions.Logout())
    }
    return Promise.reject(error)
  },
)

export const packToken = (token: string) => ({
  Authorization: `Bearer ${token}`,
})
