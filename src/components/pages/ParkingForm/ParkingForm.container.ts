import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"

import {
  SelectedActions,
  getSelectedRoot,
  ParkingsCreateActions,
  ParkingsUpdateActions,
  getParkingsFetching,
  SelectedGetActions,
} from "store/entities/locations"
import { TAppState } from "store/entities"
import { ExposeGroup, ParkingModel } from "models/location"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { ParkingForm, IProps } from "./ParkingForm"
import { ParkingFormValues } from "./ParkingForm.helper"

export type IStateProps = {
  parkings: {
    fetching: ReturnType<typeof getParkingsFetching>
  }
  selected: ReturnType<typeof getSelectedRoot>
}

export interface IDispatchProps {
  create: typeof ParkingsCreateActions.request
  update: typeof ParkingsUpdateActions.request
  getSelected: typeof SelectedGetActions.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    parkings: {
      fetching: getParkingsFetching(state),
    },
    selected: getSelectedRoot(state),
  }),
  {
    create: ParkingsCreateActions.request,
    update: ParkingsUpdateActions.request,
    getSelected: SelectedGetActions.request,
    clearSelected: SelectedActions.clear,
  },
)
const hocWithFormik = withFormik<IProps, ParkingFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new ParkingFormValues(props.selected.data as ParkingModel),
  handleSubmit: handleLocationFormSubmit,
  validate: getHandlerLocationFormValidate(ParkingModel, [ExposeGroup.WRITE]),
  validateOnBlur: true,
})

export const ParkingFormContainer = withRouter(hocConnect(hocWithFormik(ParkingForm)))
