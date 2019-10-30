import React from "react"
import { Route, RouteProps, Redirect } from "react-router-dom"

import { ROUTES_INDEX_PATH } from "constants/routes"

import { IStateProps } from "./ProtectedRoute.container"

interface IProps extends IStateProps, Omit<RouteProps, "component"> {
  component: React.ElementType<{ [key: string]: any }>
}

export const ProtectedRoute: React.FC<IProps> = ({
  fetching,
  attempts,
  authenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if ((!authenticated && fetching) || attempts === 0) {
        return null
      }
      if (authenticated && attempts > 0) {
        return <Component {...props} />
      }
      return <Redirect to={{ pathname: ROUTES_INDEX_PATH, state: { from: props.location } }} />
    }}
  />
)
