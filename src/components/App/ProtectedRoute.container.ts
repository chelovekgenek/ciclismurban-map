import { connect } from "react-redux"
import { RouteProps } from "react-router-dom"

import { TAppState } from "store/entities"
import { Selectors } from "store/entities/auth"

import { ProtectedRoute } from "./ProtectedRoute"

export interface IStateProps {
  fetching: ReturnType<typeof Selectors.getFetching>
  attempts: ReturnType<typeof Selectors.getAttempts>
  authenticated: ReturnType<typeof Selectors.getAuthenticated>
}

export default connect<IStateProps, {}, RouteProps, TAppState>(state => ({
  fetching: Selectors.getFetching(state),
  attempts: Selectors.getAttempts(state),
  authenticated: Selectors.getAuthenticated(state),
}))(ProtectedRoute)
