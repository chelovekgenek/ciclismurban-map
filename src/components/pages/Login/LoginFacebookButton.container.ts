import { connect } from "react-redux"

import { LoginByFacebookActions } from "store/entities/auth"
import { TAppState } from "store/entities"

import { LoginFacebookButton } from "./LoginFacebookButton"

export interface IDispatchProps {
  login: typeof LoginByFacebookActions.request
}

export const LoginFacebookButtonContainer = connect<{}, IDispatchProps, {}, TAppState>(
  null,
  {
    login: LoginByFacebookActions.request,
  },
)(LoginFacebookButton)
