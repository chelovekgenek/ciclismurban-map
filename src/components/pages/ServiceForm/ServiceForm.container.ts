import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"

import {
  SelectedActions,
  getSelectedRoot,
  getServicesFetching,
  ServicesCreateActions,
  ServicesUpdateActions,
  SelectedGetActions,
} from "store/entities/locations"
import { TAppState } from "store/entities"
import { ExposeGroup, ServiceModel } from "models/location"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { IProps, ServiceForm } from "./ServiceForm"
import { ServiceFormValues } from "./ServiceForm.helper"

export type IStateProps = {
  services: {
    fetching: ReturnType<typeof getServicesFetching>
  }
  selected: ReturnType<typeof getSelectedRoot>
}

export interface IDispatchProps {
  create: typeof ServicesCreateActions.request
  update: typeof ServicesUpdateActions.request
  getSelected: typeof SelectedGetActions.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    services: {
      fetching: getServicesFetching(state),
    },
    selected: getSelectedRoot(state),
  }),
  {
    create: ServicesCreateActions.request,
    update: ServicesUpdateActions.request,
    getSelected: SelectedGetActions.request,
    clearSelected: SelectedActions.clear,
  },
)
const hocWithFormik = withFormik<IProps, ServiceFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new ServiceFormValues(props.selected.data as ServiceModel),
  handleSubmit: handleLocationFormSubmit,
  validate: getHandlerLocationFormValidate(ServiceModel, [ExposeGroup.WRITE]),
  validateOnBlur: true,
})

export const ServiceFormContainer = withRouter(hocConnect(hocWithFormik(ServiceForm)))
