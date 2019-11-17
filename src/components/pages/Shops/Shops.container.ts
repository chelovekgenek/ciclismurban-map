import { connect } from "react-redux"

import { Actions as ShopsActions, Selectors as ShopsSelectors } from "store/entities/locations/shops"
import { TAppState } from "store/entities"

import { Shops } from "./Shops"

export interface IStateProps {
  shops: ReturnType<typeof ShopsSelectors.getLocations>
  fetching: ReturnType<typeof ShopsSelectors.getFetching>
}
export interface IDispatchProps {
  getShops: typeof ShopsActions.Get.request
  deleteShop: typeof ShopsActions.Delete.request
}

export const ShopsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    shops: ShopsSelectors.getLocations(state),
    fetching: ShopsSelectors.getFetching(state),
  }),
  {
    getShops: ShopsActions.Get.request,
    deleteShop: ShopsActions.Delete.request,
  },
)(Shops)
