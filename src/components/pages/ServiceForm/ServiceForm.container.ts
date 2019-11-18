import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { ServiceModel, LocationExposeGroup } from "@ciclismurban/models"

import { Actions as ServicesActions, Selectors as ServicesSelectors } from "store/entities/locations/services"
import { Actions as SelectedActions, Selectors as SelectedSelectors } from "store/entities/locations/selected"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { IProps, ServiceForm } from "./ServiceForm"
import { ServiceFormValues } from "./ServiceForm.scheme"

export type IStateProps = {
  services: {
    fetching: ReturnType<typeof ServicesSelectors.getFetching>
  }
  selected: ReturnType<typeof SelectedSelectors.getRoot>
}

export interface IDispatchProps {
  create: typeof ServicesActions.Create.request
  update: typeof ServicesActions.Update.request
  getSelected: typeof SelectedActions.Get.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    services: {
      fetching: ServicesSelectors.getFetching(state),
    },
    selected: SelectedSelectors.getRoot(state),
  }),
  {
    create: ServicesActions.Create.request,
    update: ServicesActions.Update.request,
    getSelected: SelectedActions.Get.request,
    clearSelected: SelectedActions.clear,
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
