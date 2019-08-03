import { TAppState } from "../reducers"

export const getRoot = (state: TAppState) => state.user
export const getFetching = (state: TAppState) => state.user.fetching
