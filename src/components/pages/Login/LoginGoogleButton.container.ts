import { connect } from "react-redux"

import { LoginGoogleButton } from "./LoginGoogleButton"
import { Actions } from "store/entities/auth"
import { TAppState } from "store/entities"

export interface IDispatchProps {
  login: typeof Actions.LoginByGoogle.request
}

export const LoginGoogleButtonContainer = connect<{}, IDispatchProps, {}, TAppState>(
  null,
  {
    login: Actions.LoginByGoogle.request,
  },
)(LoginGoogleButton)
