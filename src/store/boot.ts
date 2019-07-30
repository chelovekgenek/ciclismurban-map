import { Store } from "redux"
import { getFilters, pollingCurrentStart } from "./entities/locations"

export const handleBoot = (store: Store) => () =>
  new Promise(() => {
    const filters = getFilters(store.getState())

    if (filters.current) {
      store.dispatch(pollingCurrentStart())
    }
  })
