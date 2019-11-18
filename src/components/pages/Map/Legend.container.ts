import { connect } from "react-redux"

import { TAppState } from "store/entities"
import { Actions, Selectors } from "store/entities/locations/filters"

import { Legend } from "./Legend"

export interface IStateProps {
  filters: ReturnType<typeof Selectors.getRoot>
}
export interface IDispatchProps {
  toggle: typeof Actions.toggle
}

export const LegendContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    filters: Selectors.getRoot(state),
  }),
  {
    toggle: Actions.toggle,
  },
)(Legend)
