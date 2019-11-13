import { connect } from "react-redux"

import { TAppState } from "store/entities"
import { getAuthenticated, LogoutAction } from "store/entities/auth"
import { getEmail } from "store/entities/me"

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
