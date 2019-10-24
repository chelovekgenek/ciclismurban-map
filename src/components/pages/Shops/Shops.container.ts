import { connect } from "react-redux"

import { getShopsLocations, getShopsFetching, ShopsGetActions, ShopsDeleteActions } from "store/entities/locations"
import { TAppState } from "store/entities"

import { Shops } from "./Shops"

export interface IStateProps {
  shops: ReturnType<typeof getShopsLocations>
  fetching: ReturnType<typeof getShopsFetching>
}
export interface IDispatchProps {
  getShops: typeof ShopsGetActions.request
  deleteShop: typeof ShopsDeleteActions.request
}

export const ShopsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    shops: getShopsLocations(state),
    fetching: getShopsFetching(state),
  }),
  {
    getShops: ShopsGetActions.request,
    deleteShop: ShopsDeleteActions.request,
  },
)(Shops)
