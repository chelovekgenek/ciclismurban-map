import React from "react"
import { Route, RouteProps, Redirect } from "react-router-dom"

import { IStateProps } from "./ProtectedRoute.container"
import { indexRoutePath } from "./Router.options"

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
      return <Redirect to={{ pathname: indexRoutePath, state: { from: props.location } }} />
    }}
  />
)
