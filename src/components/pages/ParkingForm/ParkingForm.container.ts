import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"

import {
  SelectedActions,
  getSelectedRoot,
  ParkingsCreateActions,
  ParkingsUpdateActions,
  getParkingsFetching,
} from "store/entities/locations"
import { TAppState } from "store/entities"
import { ExposeGroup, ParkingModel } from "models/location"
import { validateFormik, handleLocationFormSubmit } from "helpers"

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
  getSelected: typeof SelectedActions.requestGet
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
    getSelected: SelectedActions.requestGet,
    clearSelected: SelectedActions.clear,
  },
)
const hocWithFormik = withFormik<IProps, ParkingFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new ParkingFormValues(props.selected.data as ParkingModel),
  handleSubmit: handleLocationFormSubmit,
  validate: v => {
    let errors = validateFormik(ParkingModel, [ExposeGroup.WRITE], ["image"])(v)
    if (!v.image) {
      errors.image = "Image must be provided"
    }
    return errors
  },
  validateOnBlur: true,
})

export const ParkingFormContainer = withRouter(hocConnect(hocWithFormik(ParkingForm)))
