import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import { routerReducer as router } from "react-router-redux"
import storage from "redux-persist/lib/storage"

import { reducer as locations } from "./locations"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["locations"],
}

const appReducers = combineReducers({
  router,
  locations,
})

export const reducers = persistReducer(persistConfig, appReducers)

export type TAppState = ReturnType<typeof appReducers>
