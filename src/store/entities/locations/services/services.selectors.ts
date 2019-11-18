import { TAppState } from "store/entities/reducer"

export const getFetching = (state: TAppState) => state.locations.services.fetching
export const getLocations = (state: TAppState) => state.locations.services.data
