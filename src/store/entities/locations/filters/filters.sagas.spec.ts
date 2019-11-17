import { expectSaga } from "redux-saga-test-plan"
import { cloneDeep, set } from "lodash-es"

import initialAppState from "mocks/initial-app-state.json"

import * as Sagas from "./filters.sagas"
import { Actions } from "./filters.actions"
import { AppReducer } from "store/entities"

describe("locations/filters/saga", () => {
  describe("handleToggle", () => {
    const action = Actions.toggle("current")
    it("should stop polling if `current` filter is disabled", async () => {
      const initialState = set(cloneDeep(initialAppState), "locations.filters.current", false)
      const finalState = set(cloneDeep(initialAppState), "locations.current.polling", false)
      return expectSaga(Sagas.handleToggle, action)
        .withReducer(AppReducer, initialState as any)
        .hasFinalState(finalState)
        .run()
    })
    it("should start polling if `current` filter is enabled", async () => {
      const initialState = set(cloneDeep(initialAppState), "locations.filters.current", true)
      const finalState = set(cloneDeep(initialState), "locations.current.polling", true)
      return expectSaga(Sagas.handleToggle, action)
        .withReducer(AppReducer, initialState as any)
        .hasFinalState(finalState)
        .run()
    })
  })
})
