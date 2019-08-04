import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import * as Page from "../pages"

export const Router = () => (
  <Switch>
    <Route exact path="/" component={Page.Map} />
    <Route exact path="/locations/:entity/:id" component={Page.Location} />
    <Route exact path="/login" component={Page.Login} />
    <Route exact path="/register" component={Page.Register} />
    <Redirect to="/" />
  </Switch>
)
