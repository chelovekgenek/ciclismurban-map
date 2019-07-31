import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import * as Page from "../pages"

export const Router = () => (
  <Switch>
    <Route exact path="/map" component={Page.Map} />
    <Redirect to="/map" />
  </Switch>
)
