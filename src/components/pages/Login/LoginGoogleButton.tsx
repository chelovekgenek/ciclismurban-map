import React, { useState, useCallback } from "react"
import { GoogleLogin, GoogleLoginResponse, GoogleLoginProps } from "react-google-login"

import { IDispatchProps } from "./LoginGoogleButton.container"
import * as LoginStyles from "./Login.styled"

interface IProps extends IDispatchProps {}

export const LoginGoogleButton: React.FC<IProps> = ({ login }) => {
  const [disabled, setDisabled] = useState(false)
  const handleSuccess = useCallback<GoogleLoginProps["onSuccess"]>(
    r => (r as GoogleLoginResponse).tokenObj && login((r as GoogleLoginResponse).tokenObj.id_token),
    [login],
  )
  const handleFailure = useCallback(() => setDisabled(true), [])
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY as string}
      render={renderProps => (
        <LoginStyles.Button icon="google" onClick={renderProps.onClick} disabled={renderProps.disabled || disabled}>
          Google
        </LoginStyles.Button>
      )}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy="single_host_origin"
    />
  )
}
