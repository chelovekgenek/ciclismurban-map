import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import { ROUTES_INDEX_PATH } from "constants/routes"

import options from "./Router.options"
import ProtectedRoute from "./ProtectedRoute.container"

export const Router = () => (
  <Switch>
    {options.map(({ protected: p, ...props }) => {
      const RouteComponent = !p ? Route : ProtectedRoute
      return (
        <RouteComponent
          key={props.path}
          exact={props.exact}
          path={props.path}
          component={props.component as React.ComponentClass}
        />
      )
    })}
    <Redirect to={ROUTES_INDEX_PATH} />
  </Switch>
)
