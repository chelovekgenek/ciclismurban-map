import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { ServiceModel, LocationExposeGroup } from "@ciclismurban/models"

import { Services, Selected } from "store/entities/locations"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { IProps, ServiceForm } from "./ServiceForm"
import { ServiceFormValues } from "./ServiceForm.scheme"

export type IStateProps = {
  services: {
    fetching: ReturnType<typeof Services.Selectors.getFetching>
  }
  selected: ReturnType<typeof Selected.Selectors.getRoot>
}

export interface IDispatchProps {
  create: typeof Services.Actions.Create.request
  update: typeof Services.Actions.Update.request
  getSelected: typeof Selected.Actions.Get.request
  clearSelected: typeof Selected.Actions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    services: {
      fetching: Services.Selectors.getFetching(state),
    },
    selected: Selected.Selectors.getRoot(state),
  }),
  {
    create: Services.Actions.Create.request,
    update: Services.Actions.Update.request,
    getSelected: Selected.Actions.Get.request,
    clearSelected: Selected.Actions.clear,
  },
)
const hocWithFormik = withFormik<IProps, ServiceFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new ServiceFormValues(props.selected.data as ServiceModel),
  handleSubmit: handleLocationFormSubmit,
  validate: getHandlerLocationFormValidate(ServiceModel, [LocationExposeGroup.WRITE]),
  validateOnBlur: true,
})

export const ServiceFormContainer = withRouter(hocConnect(hocWithFormik(ServiceForm)))
