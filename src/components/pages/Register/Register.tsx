import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { FormikProps } from "formik"

import { Input } from "components/generic/form"
import * as Layout from "components/generic/layout"

import * as Styled from "./Register.styled"
import { IStateProps, IDispatchProps } from "./Register.container"
import { LoginForm } from "../Login/LoginForm.scheme"

export interface IProps extends IStateProps, IDispatchProps {}

export const Register: React.FC<IProps & FormikProps<LoginForm>> = ({
  fetching,
  responseError,
  handleSubmit,
  isValid,
  setErrors,
}) => {
  useEffect(() => {
    if (responseError === 409) {
      setErrors({ email: "Email address is already in use" })
    }
  }, [responseError, setErrors])
  return (
    <Layout.Form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <Input name="email" type="email" placeholder="Email" prefix={<Styled.Icon type="user" />} />
      <Input name="password" type="password" placeholder="Password" prefix={<Styled.Icon type="lock" />} />
      <Styled.Button type="primary" htmlType="submit" disabled={!isValid} loading={fetching}>
        Зарегестрироваться
      </Styled.Button>
      <p>
        Или <Link to="/login">войти</Link>
      </p>
    </Layout.Form>
  )
}
