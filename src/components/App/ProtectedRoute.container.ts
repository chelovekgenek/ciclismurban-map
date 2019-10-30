import { connect } from "react-redux"

import { TAppState } from "store/entities"
import { getFetching, getAttempts, getAuthenticated } from "store/entities/user"

import { ProtectedRoute } from "./ProtectedRoute"

export interface IStateProps {
  fetching: ReturnType<typeof getFetching>
  attempts: ReturnType<typeof getAttempts>
  authenticated: ReturnType<typeof getAuthenticated>
}

export default connect<IStateProps, {}, {}, TAppState>(state => ({
  fetching: getFetching(state),
  attempts: getAttempts(state),
  authenticated: getAuthenticated(state),
}))(ProtectedRoute)