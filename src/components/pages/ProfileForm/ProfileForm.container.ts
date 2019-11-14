import { connect } from "react-redux"
import { withFormik } from "formik"
import { get } from "lodash-es"
import { UserExposeGroup, ProfileModel } from "@ciclismurban/models"

import { TAppState } from "store/entities"
import { validateFormik } from "helpers"
import { getFetching, getProfile, MeUpdateProfileActions } from "store/entities/me"

import { IProps, ProfileForm } from "./ProfileForm"
import { ProfileFormValues } from "./ProfileForm.scheme"

export interface IStateProps {
  fetching: ReturnType<typeof getFetching>
  profile: ReturnType<typeof getProfile>
}
export interface IDispatchProps {
  save: typeof MeUpdateProfileActions.request
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    fetching: getFetching(state),
    profile: getProfile(state),
  }),
  {
    save: MeUpdateProfileActions.request,
  },
)
const hocWithFormik = withFormik<IProps, ProfileFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new ProfileFormValues(props.profile),
  handleSubmit: (values, { props }) => props.save(values),
  validate: values => {
    let errors = validateFormik(ProfileModel, [UserExposeGroup.UPDATE], ["avatar"])(values)
    if (!get(values, "avatar")) {
      errors.image = "avatar must be provided"
    }
    return errors
  },
  validateOnBlur: true,
})

export const ProfileFormContainer = hocConnect(hocWithFormik(ProfileForm))
