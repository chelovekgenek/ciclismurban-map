import { get } from "lodash-es"

import { TAppState } from "store/entities/reducer"

export const getRoot = (state: TAppState) => state.me.user
export const getData = (state: TAppState) => getRoot(state).data
export const getFetching = (state: TAppState) => getRoot(state).fetching
export const getEmail = (state: TAppState) => get(getData(state), "email")
export const getProfile = (state: TAppState) => get(getData(state), "profile", {})
export const getPosition = (state: TAppState) => get(getData(state), "position")
export const getProfileAvatar = (state: TAppState) => get(getProfile(state), "avatar")
