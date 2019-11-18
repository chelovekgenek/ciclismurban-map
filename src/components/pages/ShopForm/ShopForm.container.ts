import { connect } from "react-redux"
import { withFormik } from "formik"
import { withRouter } from "react-router-dom"
import { ShopModel, LocationExposeGroup } from "@ciclismurban/models"

import { Shops, Selected } from "store/entities/locations"
import { TAppState } from "store/entities"
import { handleLocationFormSubmit, getHandlerLocationFormValidate } from "helpers"

import { IProps, ShopForm } from "./ShopForm"
import { ShopFormValues } from "./ShopForm.scheme"

export type IStateProps = {
  shops: {
    fetching: ReturnType<typeof Shops.Selectors.getFetching>
  }
  selected: ReturnType<typeof Selected.Selectors.getRoot>
}

export interface IDispatchProps {
  create: typeof Shops.Actions.Create.request
  update: typeof Shops.Actions.Update.request
  getSelected: typeof Selected.Actions.Get.request
  clearSelected: typeof Selected.Actions.clear
}

const hocConnect = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    shops: {
      fetching: Shops.Selectors.getFetching(state),
    },
    selected: Selected.Selectors.getRoot(state),
  }),
  {
    create: Shops.Actions.Create.request,
    update: Shops.Actions.Update.request,
    getSelected: Selected.Actions.Get.request,
    clearSelected: Selected.Actions.clear,
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
