import { connect } from "react-redux"

import { TAppState } from "store/entities"
import { Actions as FiltersActions, Selectors as FiltersSelectors } from "store/entities/locations/filters"

import { Legend } from "./Legend"

export interface IStateProps {
  filters: ReturnType<typeof FiltersSelectors.getRoot>
}
export interface IDispatchProps {
  toggle: typeof FiltersActions.toggle
}

export const LegendContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    filters: FiltersSelectors.getRoot(state),
  }),
  {
    toggle: FiltersActions.toggle,
  },
)(Legend)
