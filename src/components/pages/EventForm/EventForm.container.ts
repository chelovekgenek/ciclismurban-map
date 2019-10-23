import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"

import {
  EventsCreateActions,
  getEventsFetching,
  SelectedActions,
  getSelectedRoot,
  EventsUpdateActions,
} from "store/entities/locations"
import { TAppState } from "store/entities"
import { ExposeGroup, EventModel } from "models/location"
import { validateFormik, difference } from "helpers"

import { EventFormValues } from "./EventForm.helper"
import { IProps, EventForm } from "./EventForm"

export type IStateProps = {
  events: {
    fetching: ReturnType<typeof getEventsFetching>
  }
  selected: ReturnType<typeof getSelectedRoot>
}

export interface IDispatchProps {
  create: typeof EventsCreateActions.request
  update: typeof EventsUpdateActions.request
  getSelected: typeof SelectedActions.requestGet
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    events: {
      fetching: getEventsFetching(state),
    },
    selected: getSelectedRoot(state),
  }),
  {
    create: EventsCreateActions.request,
    update: EventsUpdateActions.request,
    getSelected: SelectedActions.requestGet,
    clearSelected: SelectedActions.clear,
  },
)
const hocWithFormik = withFormik<IProps, EventFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new EventFormValues(props.selected.data as EventModel),
  handleSubmit: (values, { props }) => {
    const { data: selected } = props.selected
    if (selected) {
      props.update({ uuid: selected.uuid, payload: difference(values, selected) })
    } else {
      props.create(values)
    }
  },
  validate: v => {
    let errors = validateFormik(EventModel, [ExposeGroup.WRITE], ["image"])(v)
    if (!v.image) {
      errors.image = "Image must be provided"
    }
    return errors
  },
  validateOnBlur: true,
})

export const EventFormContainer = withRouter(hocConnect(hocWithFormik(EventForm)))
