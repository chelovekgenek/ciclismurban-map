import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import { routerReducer as router } from "react-router-redux"
import storage from "redux-persist/lib/storage"

import locations from "./locations/locations.reducer"
import auth from "./auth/auth.reducer"
import me from "./me/me.reducer"

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["locations"],
}

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token"],
}

const appReducers = combineReducers({
  router,
  locations,
  me,
  auth: persistReducer(authPersistConfig, auth),
})

export type TAppState = ReturnType<typeof appReducers>

export const AppReducer = persistReducer(rootPersistConfig, appReducers)
