import { connect } from "react-redux"
import { withFormik } from "formik"
import { UserModel, UserExposeGroup } from "@ciclismurban/models"

import { validateFormik } from "helpers"
import { Actions, Selectors } from "store/entities/auth"
import { TAppState } from "store/entities"

import { IProps, Login } from "./Login"
import { LoginForm } from "./LoginForm.scheme"

export interface IStateProps {
  fetching: ReturnType<typeof Selectors.getFetching>
  responseError: ReturnType<typeof Selectors.getError>
}
export interface IDispatchProps {
  login: typeof Actions.Login.request
}

export const LoginContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    fetching: Selectors.getFetching(state),
    responseError: Selectors.getError(state),
  }),
  {
    login: Actions.Login.request,
  },
)(
  withFormik<IProps, LoginForm>({
    mapPropsToValues: () => new LoginForm(),
    handleSubmit: (values, { props }) => props.login(values),
    validate: validateFormik(UserModel, [UserExposeGroup.LOGIN]),
    validateOnBlur: true,
  })(Login),
)
