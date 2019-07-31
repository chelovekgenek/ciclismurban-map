import React from "react"
import { Router } from "react-router"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor, history } from "store"

import { Router as AppRouter } from "./Router"
import { GlobalStyles } from "./App.styled"

import "antd/dist/antd.css"

export const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
      <Router history={history}>
        <AppRouter />
      </Router>
    </PersistGate>
  </Provider>
)
