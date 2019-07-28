import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"

import { isProduction } from "helpers/env"

import { reducers, sagas } from "./entities"
import { handleBoot } from "./boot"
import { persistStore } from "redux-persist"

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

export const store = createStore(
  reducers,
  isProduction ? applyMiddleware(...middlewares) : composeWithDevTools(applyMiddleware(...middlewares)),
)

export const persistor = persistStore(store, undefined, handleBoot(store))

sagaMiddleware.run(sagas)
