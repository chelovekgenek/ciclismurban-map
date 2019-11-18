import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { ParkingModel, LocationExposeGroup } from "@ciclismurban/models"

import { Actions as ParkingsActions, Selectors as ParkingsSelectors } from "store/entities/locations/parkings"
import { Selectors as SelectedSelectors, Actions as SelectedActions } from "store/entities/locations/selected"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { ParkingForm, IProps } from "./ParkingForm"
import { ParkingFormValues } from "./ParkingForm.scheme"

export type IStateProps = {
  parkings: {
    fetching: ReturnType<typeof ParkingsSelectors.getFetching>
  }
  selected: ReturnType<typeof SelectedSelectors.getRoot>
}

export interface IDispatchProps {
  create: typeof ParkingsActions.Create.request
  update: typeof ParkingsActions.Update.request
  getSelected: typeof SelectedActions.Get.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    parkings: {
      fetching: ParkingsSelectors.getFetching(state),
    },
    selected: SelectedSelectors.getRoot(state),
  }),
  {
    create: ParkingsActions.Create.request,
    update: ParkingsActions.Update.request,
    getSelected: SelectedActions.Get.request,
    clearSelected: SelectedActions.clear,
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
