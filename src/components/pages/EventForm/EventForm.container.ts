import { connect } from "react-redux"
import { withFormik } from "formik"

import { EventsActions, getEventsFetching } from "store/entities/locations"
import { TAppState } from "store/entities"
import { ExposeGroup, EventModel } from "models/location"
import { validateFormik } from "helpers"

import { InitForm } from "./EventForm.helper"
import { IProps, EventForm } from "./EventForm"

export interface IStateProps {
  fetching: ReturnType<typeof getEventsFetching>
}
export interface IDispatchProps {
  create: typeof EventsActions.requestCreate
}

export const EventFormContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    fetching: getEventsFetching(state),
  }),
  {
    create: EventsActions.requestCreate,
  },
)(
  withFormik<IProps, InitForm>({
    mapPropsToValues: () => new InitForm(),
    handleSubmit: (values, { props }) => props.create(values),
    validate: v => {
      let errors = validateFormik(EventModel, [ExposeGroup.WRITE], ["image"])(v)
      if (!v.image) {
        errors.image = "Image must be provided"
      }
      return errors
    },
    validateOnBlur: true,
  })(EventForm),
)
