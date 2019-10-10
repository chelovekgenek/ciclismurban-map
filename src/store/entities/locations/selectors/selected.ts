import { TAppState } from "store/entities/reducers"

export const getSelectedLocation = (state: TAppState) => state.locations.selected.data
export const getSelectedFetching = (state: TAppState) => state.locations.selected.fetching