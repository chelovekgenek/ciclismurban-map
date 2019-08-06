import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import { routerReducer as router } from "react-router-redux"
import storage from "redux-persist/lib/storage"

import locations from "./locations/reducer"
import user from "./user/reducer"

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
