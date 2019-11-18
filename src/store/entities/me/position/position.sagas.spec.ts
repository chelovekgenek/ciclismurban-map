import { expectSaga } from "redux-saga-test-plan"
import * as matchers from "redux-saga-test-plan/matchers"
import { call, delay } from "redux-saga/effects"
import { cloneDeep, set } from "lodash-es"

import initialAppState from "mocks/initial-app-state.json"
import { AppReducer } from "store/entities"
import { Filters } from "store/entities/locations"
import { wrapCall } from "helpers"

import * as Sagas from "./position.sagas"
import * as Actions from "./position.actions"
import * as Facades from "./position.facades"

describe("me/position/saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate state accordingly, if response is successful", async () => {
      const mockResponse = { lat: 47.0203966, lng: 28.829422 }
      const finalState = set(cloneDeep(initialAppState), "me.position.data", mockResponse)
      return expectSaga(Sagas.handleGet)
        .withReducer(AppReducer, initialAppState as any)
        .provide([[call(Facades.getCoordinates), mockResponse]])
        .put(Actions.Get.success(mockResponse))
        .hasFinalState(finalState)
        .run()
    })
    it("should make request and mutate state accordingly, if response is failure and error `code: 1`", async () => {
      const initialState = set(cloneDeep(initialAppState), "me.position.polling", true)
      expectSaga(Sagas.handleGet)
        .withReducer(AppReducer, initialState as any)
        .provide([{ call: wrapCall(Facades.getCoordinates, () => new Promise((_r, reject) => reject({ code: 1 }))) }])
        .put(Actions.Get.failure())
        .put(Actions.Polling.stop())
        .hasFinalState(initialAppState)
        .run()
    })
  })
})
