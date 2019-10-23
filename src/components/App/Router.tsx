import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import * as Guard from "components/generic/guard"

import * as Page from "../pages"

export const Router = () => (
  <Switch>
    <Route exact path="/" component={Page.Map} />
    <Route path="/locations/:entity/:id" component={Page.Location} />
    <Route exact path="/login" component={Page.Login} />
    <Route exact path="/register" component={Page.Register} />
    <Guard.Authentication>
      <Route exact path="/events" component={Page.Events} />
      <Route exact path="/event" component={Page.EventForm} />
      <Route path="/event/:id" component={Page.EventForm} />
      <Route exact path="/parkings" component={Page.Parkings} />
    </Guard.Authentication>
    <Redirect to="/" />
  </Switch>
)
