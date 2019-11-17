import { TAppState } from "store/entities/reducers"

export const getFetching = (state: TAppState) => state.locations.parkings.fetching
export const getLocations = (state: TAppState) => state.locations.parkings.data
