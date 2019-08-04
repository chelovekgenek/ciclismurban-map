import { Store } from "redux"
import { getFilters, CurrentActions } from "./entities/locations"
import { getToken, LoginByTokenActions } from "./entities/user"

export const handleBoot = ({ dispatch, getState }: Store) => () =>
  new Promise(() => {
    const state = getState()
    const filters = getFilters(state)
    const token = getToken(state)

    if (filters.current) {
      dispatch(CurrentActions.pollingStart())
    }
    if (token) {
      dispatch(LoginByTokenActions.request())
    }
  })
