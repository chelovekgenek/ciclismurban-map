import { TAppState } from "store/entities/reducers"

export const getCurrentLocation = (state: TAppState) => state.locations.current.data
