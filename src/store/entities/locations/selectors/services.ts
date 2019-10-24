import { TAppState } from "store/entities/reducers"

export const getServicesFetching = (state: TAppState) => state.locations.services.fetching
export const getServicesLocations = (state: TAppState) => state.locations.services.data
