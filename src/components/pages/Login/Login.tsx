import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withFormik, FormikProps } from "formik"

import { Input } from "components/generic/ui"
import * as Layout from "components/generic/layout"
import { validateFormik } from "helpers"
import { UserModel, ExposeGroup, LoginForm } from "models/user"
import { LoginActions, getFetching, getError } from "store/entities/user"
import { TAppState } from "store/entities"

import * as Styled from "./Login.styled"
import { Link } from "react-router-dom"

interface IStateProps {
  fetching: ReturnType<typeof getFetching>
  responseError: ReturnType<typeof getError>
}
interface IDispatchProps {
  login: typeof LoginActions.request
}
interface IProps extends IStateProps, IDispatchProps {}

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
      <p>
        Или <Link to="/register">зарегестрироваться</Link>
      </p>
    </Layout.Form>
  )
}

export default connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    fetching: getFetching(state),
    responseError: getError(state),
  }),
  {
    login: LoginActions.request,
  },
)(
  withFormik<IProps, LoginForm>({
    mapPropsToValues: () => new LoginForm(),
    handleSubmit: (values, { props }) => props.login(values),
    validate: validateFormik(UserModel, [ExposeGroup.LOGIN]),
    validateOnBlur: true,
  })(Login),
)
