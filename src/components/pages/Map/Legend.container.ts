import { connect } from "react-redux"

import { TAppState } from "store/entities"
import { FiltersActions, getFilters } from "store/entities/locations"

import { Legend } from "./Legend"

export interface IStateProps {
  filters: ReturnType<typeof getFilters>
}
export interface IDispatchProps {
  toggle: typeof FiltersActions.toggle
}

export const LegendContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    filters: getFilters(state),
  }),
  {
    toggle: FiltersActions.toggle,
  },
)(Legend)
