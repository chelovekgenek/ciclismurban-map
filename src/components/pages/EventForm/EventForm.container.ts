import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { EventModel, LocationExposeGroup } from "@ciclismurban/models"

import { Events, Selected } from "store/entities/locations"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"
import { TAppState } from "store/entities"

import { EventFormValues } from "./EventForm.helper"
import { IProps, EventForm } from "./EventForm"

export type IStateProps = {
  events: {
    fetching: ReturnType<typeof Events.Selectors.getFetching>
  }
  selected: ReturnType<typeof Selected.Selectors.getRoot>
}

export interface IDispatchProps {
  create: typeof Events.Actions.Create.request
  update: typeof Events.Actions.Update.request
  getSelected: typeof Selected.Actions.Get.request
  clearSelected: typeof Selected.Actions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: {
      fetching: Events.Selectors.getFetching(state),
    },
    selected: Selected.Selectors.getRoot(state),
  }),
  {
    create: Events.Actions.Create.request,
    update: Events.Actions.Update.request,
    getSelected: Selected.Actions.Get.request,
    clearSelected: Selected.Actions.clear,
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
