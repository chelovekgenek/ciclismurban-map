import { connect } from "react-redux"

import { getAuthenticated, getEmail, LogoutAction } from "store/entities/user"
import { TAppState } from "store/entities"
import { Header } from "./Header"

export interface IDispatchProps {
  logout: typeof LogoutAction
}
export interface IStateProps {
  authenticated: ReturnType<typeof getAuthenticated>
  email: ReturnType<typeof getEmail>
}

export const HeaderContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    authenticated: getAuthenticated(state),
    email: getEmail(state),
  }),
  {
    logout: LogoutAction,
  },
)(Header)
