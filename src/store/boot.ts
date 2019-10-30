import { Store } from "redux"
import { matchPath } from "react-router-dom"

import routes from "components/App/Router.options"
import { ROUTES_INDEX_PATH } from "constants/routes"

import { getFilters, CurrentActions } from "./entities/locations"
import { getToken, LoginByTokenActions } from "./entities/user"
import { history } from "./history"

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
    } else {
      const currentRoute = routes.find(item => matchPath(history.location.pathname, item))
      if (currentRoute) {
        history.replace(ROUTES_INDEX_PATH)
      }
    }
  })
