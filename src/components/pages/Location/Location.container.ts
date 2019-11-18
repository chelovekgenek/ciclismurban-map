import { connect } from "react-redux"
import { withRouter } from "react-router"

import { Actions, Selectors } from "store/entities/locations/selected"
import { TAppState } from "store/entities"

import { Location } from "./Location"

export interface IStateProps {
  selected: ReturnType<typeof Selectors.getLocation>
  fetching: ReturnType<typeof Selectors.getFetching>
}
export interface IDispatchProps {
  getSelected: typeof Actions.Get.request
  clearSelected: typeof Actions.clear
}

export const LocationContainer = withRouter(
  connect<IStateProps, IDispatchProps, {}, TAppState>(
    state => ({
      selected: Selectors.getLocation(state),
      fetching: Selectors.getFetching(state),
    }),
    {
      getSelected: Actions.Get.request,
      clearSelected: Actions.clear,
    },
  )(Location),
)
