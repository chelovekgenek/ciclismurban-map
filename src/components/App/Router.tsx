import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import * as Guard from "components/generic/guard"

import * as Page from "../pages"

export const Router = () => (
  <Switch>
    <Route exact path="/" component={Page.Map} />
    <Route exact path="/locations/:entity/:id" component={Page.Location} />
    <Route exact path="/login" component={Page.Login} />
    <Route exact path="/register" component={Page.Register} />
    <Guard.Authentication>
      <Route exact path="/events" component={Page.Events} />
      <Route exact path="/events/new" component={Page.EventForm} />
      <Route exact path="/events/:id" component={Page.EventForm} />
    </Guard.Authentication>
    <Redirect to="/" />
  </Switch>
)
