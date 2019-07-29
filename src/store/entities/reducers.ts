import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { reducer as filters } from "./filters"
import { reducer as points } from "./locations"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["filters"],
}

const appReducers = combineReducers({
  filters,
  points,
})

export const reducers = persistReducer(persistConfig, appReducers)

export type TAppState = ReturnType<typeof appReducers>
