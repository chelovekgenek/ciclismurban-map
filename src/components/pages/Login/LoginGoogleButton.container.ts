import { connect } from "react-redux"

import { LoginGoogleButton } from "./LoginGoogleButton"
import { LoginByGoogleActions } from "store/entities/auth"
import { TAppState } from "store/entities"

export interface IDispatchProps {
  login: typeof LoginByGoogleActions.request
}

export const LoginGoogleButtonContainer = connect<{}, IDispatchProps, {}, TAppState>(
  null,
  {
    login: LoginByGoogleActions.request,
  },
)(LoginGoogleButton)
