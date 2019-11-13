import { connect } from "react-redux"
import { withFormik } from "formik"
import { UserModel, UserExposeGroup } from "@ciclismurban/models"

import { validateFormik } from "helpers"
import { getFetching, RegisterActions, getError } from "store/entities/auth"
import { TAppState } from "store/entities"

import { IProps, Register } from "./Register"
import { LoginForm } from "../Login/LoginForm.scheme"

export interface IStateProps {
  fetching: ReturnType<typeof getFetching>
  responseError: ReturnType<typeof getError>
}
export interface IDispatchProps {
  register: typeof RegisterActions.request
}

export const RegisterContainer = connect<IStateProps, IDispatchProps, IProps, TAppState>(
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
    validate: validateFormik(UserModel, [UserExposeGroup.WRITE]),
    validateOnBlur: true,
  })(Register),
)
