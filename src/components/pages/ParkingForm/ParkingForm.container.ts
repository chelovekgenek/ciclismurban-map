import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { ParkingModel, LocationExposeGroup } from "@ciclismurban/models"

import { SelectedActions, getSelectedRoot, SelectedGetActions } from "store/entities/locations"
import { Actions as ParkingsActions, Selectors as ParkingsSelectors } from "store/entities/locations/parkings"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { ParkingForm, IProps } from "./ParkingForm"
import { ParkingFormValues } from "./ParkingForm.scheme"

export type IStateProps = {
  parkings: {
    fetching: ReturnType<typeof ParkingsSelectors.getFetching>
  }
  selected: ReturnType<typeof getSelectedRoot>
}

export interface IDispatchProps {
  create: typeof ParkingsActions.Create.request
  update: typeof ParkingsActions.Update.request
  getSelected: typeof SelectedGetActions.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    parkings: {
      fetching: ParkingsSelectors.getFetching(state),
    },
    selected: getSelectedRoot(state),
  }),
  {
    create: ParkingsActions.Create.request,
    update: ParkingsActions.Update.request,
    getSelected: SelectedGetActions.request,
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
