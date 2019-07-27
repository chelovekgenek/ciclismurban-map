import React from "react"

import { MainLayout } from "components"

import { GlobalStyles } from "./App.styled"

import "antd/dist/antd.css"

export const App: React.FC = () => (
  <React.Fragment>
    <GlobalStyles />
    <MainLayout />
  </React.Fragment>
)
