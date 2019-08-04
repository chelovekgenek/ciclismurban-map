import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withFormik, FormikProps } from "formik"

import { Input } from "components/generic/ui"
import * as Layout from "components/generic/layout"
import { validateFormik } from "helpers"
import { UserModel, ExposeGroup, LoginForm } from "models/user"
import { getFetching, RegisterActions, getError } from "store/entities/user"
import { TAppState } from "store/entities"

import * as Styled from "./Register.styled"
import { Link } from "react-router-dom"

interface IStateProps {
  fetching: ReturnType<typeof getFetching>
  responseError: ReturnType<typeof getError>
}
interface IDispatchProps {
  register: typeof RegisterActions.request
}
interface IProps extends IStateProps, IDispatchProps {}

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

export default connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    fetching: getFetching(state),
    responseError: getError(state),
  }),
  {
    register: RegisterActions.request,
  },
)(
  withFormik<IProps, LoginForm>({
    mapPropsToValues: () => new LoginForm(),
    handleSubmit: (values, { props }) => props.register(values),
    validate: validateFormik(UserModel, [ExposeGroup.WRITE]),
    validateOnBlur: true,
  })(Register),
)
