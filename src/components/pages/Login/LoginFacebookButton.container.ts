import { connect } from "react-redux"

import { Actions } from "store/entities/auth"
import { TAppState } from "store/entities"

import { LoginFacebookButton } from "./LoginFacebookButton"

export interface IDispatchProps {
  login: typeof Actions.LoginByFacebook.request
}

export const LoginFacebookButtonContainer = connect<{}, IDispatchProps, {}, TAppState>(
  null,
  {
    login: Actions.LoginByFacebook.request,
  },
)(LoginFacebookButton)
