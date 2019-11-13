import { TAppState } from "../reducers"

export const getRoot = (state: TAppState) => state.auth
export const getFetching = (state: TAppState) => getRoot(state).fetching
export const getError = (state: TAppState) => getRoot(state).error
export const getToken = (state: TAppState) => getRoot(state).token
export const getAuthenticated = (state: TAppState) => getRoot(state).authenticated
export const getAttempts = (state: TAppState) => getRoot(state).attempts
