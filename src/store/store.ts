import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { routerMiddleware } from "react-router-redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { persistStore } from "redux-persist"

import { reducers, sagas } from "./entities"
import { history } from "./history"
import { handleBoot } from "./boot"

const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)))

export const persistor = persistStore(store, undefined, handleBoot(store))

sagaMiddleware.run(sagas)
