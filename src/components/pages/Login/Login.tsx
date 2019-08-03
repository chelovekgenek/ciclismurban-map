import React, { useCallback } from "react"
import { connect } from "react-redux"
import { Formik } from "formik"

import { Input } from "components/generic/ui"
import * as Layout from "components/generic/layout"
import { validateFormik } from "helpers"
import { UserModel, ExposeGroup, LoginForm } from "models/user"
import { LoginActions, getFetching } from "store/entities/user"
import { TAppState } from "store/entities"

import * as Styled from "./Login.styled"

interface IStateProps {
  fetching: ReturnType<typeof getFetching>
}
interface IDispatchProps {
  login: typeof LoginActions.request
}
interface IProps extends IStateProps, IDispatchProps {}

export const Login: React.FC<IProps> = ({ login, fetching }) => {
  const handleSubmit = useCallback(values => login(values), [login])
  const validate = useCallback(validateFormik(UserModel, [ExposeGroup.LOGIN]), [])
  return (
    <Formik initialValues={new LoginForm()} onSubmit={handleSubmit} validate={validate} validateOnBlur>
      {({ isValid, handleSubmit }) => (
        <Layout.Form onSubmit={handleSubmit}>
          <h2>Вход</h2>
          <Input name="email" type="email" placeholder="Email" prefix={<Styled.Icon type="user" />} />
          <Input name="password" type="password" placeholder="Password" prefix={<Styled.Icon type="lock" />} />
          <Styled.Button type="primary" htmlType="submit" disabled={!isValid} loading={fetching}>
            Войти
          </Styled.Button>
        </Layout.Form>
      )}
    </Formik>
  )
}

export default connect<IStateProps, IDispatchProps, null, TAppState>(
  state => ({
    fetching: getFetching(state),
  }),
  {
    login: LoginActions.request,
  },
)(Login)
