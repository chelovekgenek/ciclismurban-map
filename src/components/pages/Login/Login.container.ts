import { connect } from "react-redux"
import { withFormik } from "formik"
import { UserModel, UserExposeGroup } from "@ciclismurban/models"

import { validateFormik } from "helpers"
import { LoginActions, getFetching, getError } from "store/entities/auth"
import { TAppState } from "store/entities"

import { IProps, Login } from "./Login"
import { LoginForm } from "./LoginForm.scheme"

export interface IStateProps {
  fetching: ReturnType<typeof getFetching>
  responseError: ReturnType<typeof getError>
}
export interface IDispatchProps {
  login: typeof LoginActions.request
}

export const LoginContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
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
    validate: validateFormik(UserModel, [UserExposeGroup.LOGIN]),
    validateOnBlur: true,
  })(Login),
)
