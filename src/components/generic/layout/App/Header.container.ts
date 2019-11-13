import { connect } from "react-redux"

import { getAuthenticated, LogoutAction } from "store/entities/auth"
import { TAppState } from "store/entities"
import { Header } from "./Header"

export interface IDispatchProps {
  logout: typeof LogoutAction
}
export interface IStateProps {
  authenticated: ReturnType<typeof getAuthenticated>
  email: string
}

export const HeaderContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    authenticated: getAuthenticated(state),
    email: "",
  }),
  {
    logout: LogoutAction,
  },
)(Header)
