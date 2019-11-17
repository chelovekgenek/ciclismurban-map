import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { EventModel, LocationExposeGroup } from "@ciclismurban/models"

import { SelectedActions, getSelectedRoot, SelectedGetActions } from "store/entities/locations"
import { Selectors as EventsSelectors } from "store/entities/locations/events"
import { Actions as EventsActions } from "store/entities/locations/events"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"
import { TAppState } from "store/entities"

import { EventFormValues } from "./EventForm.helper"
import { IProps, EventForm } from "./EventForm"

export type IStateProps = {
  events: {
    fetching: ReturnType<typeof EventsSelectors.getFetching>
  }
  selected: ReturnType<typeof getSelectedRoot>
}

export interface IDispatchProps {
  create: typeof EventsActions.Create.request
  update: typeof EventsActions.Update.request
  getSelected: typeof SelectedGetActions.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: {
      fetching: EventsSelectors.getFetching(state),
    },
    selected: getSelectedRoot(state),
  }),
  {
    create: EventsActions.Create.request,
    update: EventsActions.Update.request,
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
