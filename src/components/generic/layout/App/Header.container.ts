import { connect } from "react-redux"

import { TAppState } from "store/entities"
import { getAuthenticated, LogoutAction } from "store/entities/auth"
import { User } from "store/entities/me"

import { Header } from "./Header"

export interface IDispatchProps {
  logout: typeof LogoutAction
}
export interface IStateProps {
  authenticated: ReturnType<typeof getAuthenticated>
  email: ReturnType<typeof User.Selectors.getEmail>
  avatar: ReturnType<typeof User.Selectors.getProfileAvatar>
}

export const HeaderContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    authenticated: getAuthenticated(state),
    email: User.Selectors.getEmail(state),
    avatar: User.Selectors.getProfileAvatar(state),
  }),
  {
    logout: LogoutAction,
  },
)(Header)
