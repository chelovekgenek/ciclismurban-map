import { createSelector } from "reselect"
import { union } from "lodash-es"

import { TAppState } from "store/entities/reducers"
import { getRoot } from "./root"

export const getFilters = (state: TAppState) => state.locations.filters

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
