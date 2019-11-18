import { connect } from "react-redux"

import { TAppState } from "store/entities"
import * as Auth from "store/entities/auth"
import { User } from "store/entities/me"

import { Header } from "./Header"

export interface IDispatchProps {
  logout: typeof Auth.Actions.Logout
}
export interface IStateProps {
  authenticated: ReturnType<typeof Auth.Selectors.getAuthenticated>
  email: ReturnType<typeof User.Selectors.getEmail>
  avatar: ReturnType<typeof User.Selectors.getProfileAvatar>
}

export const HeaderContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    authenticated: Auth.Selectors.getAuthenticated(state),
    email: User.Selectors.getEmail(state),
    avatar: User.Selectors.getProfileAvatar(state),
  }),
  {
    logout: Auth.Actions.Logout,
  },
)(Header)
