import { connect } from "react-redux"
import { withRouter } from "react-router"

import { getSelectedLocation, getSelectedFetching, SelectedActions } from "store/entities/locations"
import { TAppState } from "store/entities"
import { Location } from "./Location"

export interface IStateProps {
  selected: ReturnType<typeof getSelectedLocation>
  fetching: ReturnType<typeof getSelectedFetching>
}
export interface IDispatchProps {
  getSelected: typeof SelectedActions.requestGet
  clearSelected: typeof SelectedActions.clear
}

export const LocationContainer = withRouter(
  connect<IStateProps, IDispatchProps, {}, TAppState>(
    state => ({
      selected: getSelectedLocation(state),
      fetching: getSelectedFetching(state),
    }),
    {
      getSelected: SelectedActions.requestGet,
      clearSelected: SelectedActions.clear,
    },
  )(Location),
)