import { connect } from "react-redux"

import { Actions, Selectors } from "store/entities/locations/services"
import { TAppState } from "store/entities"

import { Services } from "./Services"

export interface IStateProps {
  services: ReturnType<typeof Selectors.getLocations>
  fetching: ReturnType<typeof Selectors.getFetching>
}
export interface IDispatchProps {
  getServices: typeof Actions.Get.request
  deleteService: typeof Actions.Delete.request
}

export const ServicesContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    services: Selectors.getLocations(state),
    fetching: Selectors.getFetching(state),
  }),
  {
    getServices: Actions.Get.request,
    deleteService: Actions.Delete.request,
  },
)(Services)
