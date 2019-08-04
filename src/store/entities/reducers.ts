import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import { routerReducer as router } from "react-router-redux"
import storage from "redux-persist/lib/storage"

import { reducer as locations } from "./locations"
import { reducer as user } from "./user"

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["locations"],
}

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["token"],
}

const appReducers = combineReducers({
  router,
  locations,
  user: persistReducer(userPersistConfig, user),
})

export const reducers = persistReducer(rootPersistConfig, appReducers)

export type TAppState = ReturnType<typeof appReducers>
