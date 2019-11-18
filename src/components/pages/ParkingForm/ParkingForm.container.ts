import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { ParkingModel, LocationExposeGroup } from "@ciclismurban/models"

import { Parkings, Selected } from "store/entities/locations"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { ParkingForm, IProps } from "./ParkingForm"
import { ParkingFormValues } from "./ParkingForm.scheme"

export type IStateProps = {
  parkings: {
    fetching: ReturnType<typeof Parkings.Selectors.getFetching>
  }
  selected: ReturnType<typeof Selected.Selectors.getRoot>
}

export interface IDispatchProps {
  create: typeof Parkings.Actions.Create.request
  update: typeof Parkings.Actions.Update.request
  getSelected: typeof Selected.Actions.Get.request
  clearSelected: typeof Selected.Actions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    parkings: {
      fetching: Parkings.Selectors.getFetching(state),
    },
    selected: Selected.Selectors.getRoot(state),
  }),
  {
    create: Parkings.Actions.Create.request,
    update: Parkings.Actions.Update.request,
    getSelected: Selected.Actions.Get.request,
    clearSelected: Selected.Actions.clear,
  },
)
const hocWithFormik = withFormik<IProps, ParkingFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new ParkingFormValues(props.selected.data as ParkingModel),
  handleSubmit: handleLocationFormSubmit,
  validate: getHandlerLocationFormValidate(ParkingModel, [LocationExposeGroup.WRITE]),
  validateOnBlur: true,
})

export const ParkingFormContainer = withRouter(hocConnect(hocWithFormik(ParkingForm)))
