import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import * as Page from "../pages"

export const Router = () => (
  <Switch>
    <Route exact path="/map" component={Page.Map} />
    <Route exact path="/locations/:entity/:id" component={Page.Location} />
    <Redirect to="/map" />
  </Switch>
)
