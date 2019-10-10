import { TAppState } from "store/entities/reducers"

export const getParkingsFetching = (state: TAppState) => state.locations.parkings.fetching
export const getParkingsLocations = (state: TAppState) => state.locations.parkings.data
