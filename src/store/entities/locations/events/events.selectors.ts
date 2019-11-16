import { TAppState } from "store/entities/reducers"

export const getFetching = (state: TAppState) => state.locations.events.fetching
export const getLocations = (state: TAppState) => state.locations.events.data
