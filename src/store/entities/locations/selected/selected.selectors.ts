import { TAppState } from "store/entities/reducer"

export const getRoot = (state: TAppState) => state.locations.selected
export const getLocation = (state: TAppState) => state.locations.selected.data
export const getFetching = (state: TAppState) => state.locations.selected.fetching
