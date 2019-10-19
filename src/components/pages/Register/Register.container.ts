import { connect } from "react-redux"
import { withFormik } from "formik"

import { validateFormik } from "helpers"
import { UserModel, ExposeGroup, LoginForm } from "models/user"
import { getFetching, RegisterActions, getError } from "store/entities/user"
import { TAppState } from "store/entities"

import { IProps, Register } from "./Register"

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
    validate: validateFormik(UserModel, [ExposeGroup.WRITE]),
    validateOnBlur: true,
  })(Register),
)
