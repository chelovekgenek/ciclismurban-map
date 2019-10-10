import { TAppState } from "store/entities/reducers"

export const getEventsFetching = (state: TAppState) => state.locations.events.fetching
export const getEventsLocations = (state: TAppState) => state.locations.events.data
