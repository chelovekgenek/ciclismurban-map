import React, { useState, useCallback } from "react"

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

import { IDispatchProps } from "./LoginFacebookButton.container"
import * as LoginStyles from "./Login.styled"

interface IProps extends IDispatchProps {}

export const LoginFacebookButton: React.FC<IProps> = ({ login }) => {
  const [disabled, setDisabled] = useState(false)
  const onSucess = useCallback(r => r.accessToken && login(r.accessToken), [login])
  const handleFailure = useCallback(() => setDisabled(true), [])
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_OAUTH_KEY as string}
      autoLoad
      render={(renderProps: any) => (
        <LoginStyles.Button icon="facebook" onClick={renderProps.onClick} disabled={renderProps.disabled || disabled}>
          Facebook
        </LoginStyles.Button>
      )}
      callback={onSucess}
      onFailure={handleFailure}
    />
  )
}
