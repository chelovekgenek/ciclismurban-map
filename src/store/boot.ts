import { Store } from "redux"
import { matchPath } from "react-router-dom"

import routes from "components/App/Router.options"
import { ROUTES_INDEX_PATH } from "constants/routes"

import { Selectors as FiltersSelectors } from "./entities/locations/filters"
import { Position } from "./entities/me"
import * as Auth from "./entities/auth"
import { history } from "./history"
import { TAppState } from "./entities"

export const handleBoot = ({ dispatch, getState }: Store<TAppState>) => () =>
  new Promise(resolve => {
    const state = getState()
    const filters = FiltersSelectors.getRoot(state)
    const token = Auth.Selectors.getToken(state)

    if (filters.current) {
      dispatch(Position.Actions.Polling.start())
    }
    if (token) {
      dispatch(Auth.Actions.LoginByToken.request())
    } else {
      const currentRoute = routes.find(item => matchPath(history.location.pathname, item))
      if (currentRoute && currentRoute.protected) {
        history.replace(ROUTES_INDEX_PATH)
      }
    }
    resolve()
  })
