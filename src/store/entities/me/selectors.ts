import { get } from "lodash-es"

import { TAppState } from "../reducers"

export const getRoot = (state: TAppState) => state.me
export const getData = (state: TAppState) => getRoot(state).data
export const getEmail = (state: TAppState) => get(getData(state), "email")
