import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { FormikProps } from "formik"

import { Input } from "components/generic/form"
import { Divider } from "components/generic/ui"
import * as Layout from "components/generic/layout"
import { LoginForm } from "models/user"

import * as Styled from "./Login.styled"
import { IStateProps, IDispatchProps } from "./Login.container"
import { LoginGoogleButtonContainer as LoginGoogleButton } from "./LoginGoogleButton.container"

export interface IProps extends IStateProps, IDispatchProps {}

export const Login: React.FC<IProps & FormikProps<LoginForm>> = ({
  responseError,
  fetching,
  handleSubmit,
  isValid,
  setErrors,
}) => {
  useEffect(() => {
    if (responseError === 401) {
      setErrors(new LoginForm())
    }
  }, [responseError, setErrors])
  return (
    <Layout.Form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <Input name="email" type="email" placeholder="Email" prefix={<Styled.Icon type="user" />} />
      <Input name="password" type="password" placeholder="Password" prefix={<Styled.Icon type="lock" />} />
      <Styled.Button type="primary" htmlType="submit" disabled={!isValid} loading={fetching}>
        Войти
      </Styled.Button>
      <LoginGoogleButton />
      <Divider>или</Divider>
      <Styled.CenterText>
        <Link to="/register">зарегестрироваться</Link>
      </Styled.CenterText>
    </Layout.Form>
  )
}
