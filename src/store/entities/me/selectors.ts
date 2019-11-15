import { get } from "lodash-es"

import { TAppState } from "../reducers"

export const getRoot = (state: TAppState) => state.me
export const getData = (state: TAppState) => getRoot(state).data
export const getFetching = (state: TAppState) => getRoot(state).fetching
export const getEmail = (state: TAppState) => get(getData(state), "email")
export const getProfile = (state: TAppState) => get(getData(state), "profile", {})
export const getProfileAvatar = (state: TAppState) => get(getProfile(state), "avatar")
