import { TAppState } from "store/entities/reducer"

export const getLocation = (state: TAppState) => state.me.position.data
