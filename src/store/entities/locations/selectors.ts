import { createSelector } from "reselect"
import { union } from "lodash-es"

import { TAppState } from "../reducers"

export const getRoot = (state: TAppState) => state.locations
export const getFilters = (state: TAppState) => state.locations.filters
export const getCurrentData = (state: TAppState) => state.locations.current.data
export const getSelectedData = (state: TAppState) => state.locations.selected.data
export const getSelectedFetching = (state: TAppState) => state.locations.selected.fetching

export const getEventsFetching = (state: TAppState) => state.locations.events.fetching

export const getFilteredLocations = createSelector(
  getRoot,
  getFilters,
  (locations, filters) => ({
    events: filters.events ? locations.events.data : [],
    parkings: filters.parkings ? locations.parkings.data : [],
    services: filters.services ? locations.services.data : [],
    shops: filters.shops ? locations.shops.data : [],
  }),
)

export const getFilteredLocationsCount = createSelector(
  getFilteredLocations,
  locations => union(locations.parkings, locations.services, locations.shops).length,
)
