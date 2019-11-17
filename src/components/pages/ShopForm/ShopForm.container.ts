import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { ShopModel, LocationExposeGroup } from "@ciclismurban/models"

import { SelectedActions, getSelectedRoot, SelectedGetActions } from "store/entities/locations"
import { Actions as ShopsActions, Selectors as ShopsSelectors } from "store/entities/locations/shops"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { IProps, ShopForm } from "./ShopForm"
import { ShopFormValues } from "./ShopForm.scheme"

export type IStateProps = {
  shops: {
    fetching: ReturnType<typeof ShopsSelectors.getFetching>
  }
  selected: ReturnType<typeof getSelectedRoot>
}

export interface IDispatchProps {
  create: typeof ShopsActions.Create.request
  update: typeof ShopsActions.Update.request
  getSelected: typeof SelectedGetActions.request
  clearSelected: typeof SelectedActions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    shops: {
      fetching: ShopsSelectors.getFetching(state),
    },
    selected: getSelectedRoot(state),
  }),
  {
    create: ShopsActions.Create.request,
    update: ShopsActions.Update.request,
    getSelected: SelectedGetActions.request,
    clearSelected: SelectedActions.clear,
  },
)
const hocWithFormik = withFormik<IProps, ShopFormValues>({
  enableReinitialize: true,
  mapPropsToValues: props => new ShopFormValues(props.selected.data as ShopModel),
  handleSubmit: handleLocationFormSubmit,
  validate: getHandlerLocationFormValidate(ShopModel, [LocationExposeGroup.WRITE]),
  validateOnBlur: true,
})

export const ShopFormContainer = withRouter(hocConnect(hocWithFormik(ShopForm)))
