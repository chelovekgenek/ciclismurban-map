import { connect } from "react-redux"
import { withFormik } from "formik"
import { UserModel, UserExposeGroup } from "@ciclismurban/models"

import { validateFormik } from "helpers"
import * as Auth from "store/entities/auth"
import { TAppState } from "store/entities"

import { IProps, Register } from "./Register"
import { LoginForm } from "../Login/LoginForm.scheme"

export interface IStateProps {
  fetching: ReturnType<typeof Auth.Selectors.getFetching>
  responseError: ReturnType<typeof Auth.Selectors.getError>
}
export interface IDispatchProps {
  register: typeof Auth.Actions.Register.request
}

export const RegisterContainer = connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    fetching: Auth.Selectors.getFetching(state),
    responseError: Auth.Selectors.getError(state),
  }),
  {
    register: Auth.Actions.Register.request,
  },
)(
  withFormik<IProps, LoginForm>({
    mapPropsToValues: () => new LoginForm(),
    handleSubmit: (values, { props }) => props.register(values),
    validate: validateFormik(UserModel, [UserExposeGroup.WRITE]),
    validateOnBlur: true,
  })(Register),
)
