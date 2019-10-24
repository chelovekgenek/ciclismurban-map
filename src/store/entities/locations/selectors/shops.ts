import { TAppState } from "store/entities/reducers"

export const getShopsFetching = (state: TAppState) => state.locations.shops.fetching
export const getShopsLocations = (state: TAppState) => state.locations.shops.data
