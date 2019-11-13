import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { EventModel, LocationExposeGroup } from "@ciclismurban/models"

import {
  EventsCreateActions,
  getEventsFetching,
  SelectedActions,
  getSelectedRoot,
  EventsUpdateActions,
  SelectedGetActions,
} from "store/entities/locations"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

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
  getSelected: typeof SelectedGetActions.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: {
      fetching: getEventsFetching(state),
    },
    selected: getSelectedRoot(state),
  }),
  {
    create: EventsCreateActions.request,
    update: EventsUpdateActions.request,
    getSelected: SelectedGetActions.request,
    clearSelected: SelectedActions.clear,
  },
)
const hocWithFormik = withFormik<IProps, EventFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new EventFormValues(props.selected.data as EventModel),
  handleSubmit: handleLocationFormSubmit,
  validate: getHandlerLocationFormValidate(EventModel, [LocationExposeGroup.WRITE]),
  validateOnBlur: true,
})

export const EventFormContainer = withRouter(hocConnect(hocWithFormik(EventForm)))
