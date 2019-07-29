import { createSelector } from "reselect"
import { union } from "lodash-es"

import * as filters from "../filters/selectors"
import { TAppState } from "../reducers"

export const getRoot = (state: TAppState) => state.points

export const getFilteredLocations = createSelector(
  getRoot,
  filters.getRoot,
  (locations, filters) => ({
    parkings: filters.parkings ? locations.parkings.data : [],
    services: filters.services ? locations.services.data : [],
    shops: filters.shops ? locations.shops.data : [],
  }),
)

export const getFilteredLocationsCount = createSelector(
  getFilteredLocations,
  locations => union(locations.parkings, locations.services, locations.shops).length,
)
