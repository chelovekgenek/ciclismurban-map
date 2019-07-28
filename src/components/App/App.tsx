import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { store, persistor } from "store"
import { MainLayout } from "components"

import { GlobalStyles } from "./App.styled"

import "antd/dist/antd.css"

export const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
      <MainLayout />
    </PersistGate>
  </Provider>
)
