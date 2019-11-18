import { TAppState } from "store/entities/reducers"

export const getLocation = (state: TAppState) => state.me.position.data
