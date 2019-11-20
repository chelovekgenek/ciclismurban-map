import { expectSaga } from "redux-saga-test-plan"
import * as matchers from "redux-saga-test-plan/matchers"
import { call, delay } from "redux-saga/effects"
import { cloneDeep, set } from "lodash-es"

import initialAppState from "mocks/initial-app-state.json"
import user from "mocks/user.json"
import { AppReducer } from "store/entities"
import { Filters } from "store/entities/locations"
import { wrapCall } from "helpers"

import * as Sagas from "./position.sagas"
import * as Actions from "./position.actions"
import * as Facades from "./position.facades"
import { Actions as UserActions } from "../user"

describe("me/position/saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate state accordingly, if response is successful", async () => {
      const mockResponse = { lat: 47.020123, lng: 28.829422 }
      const finalState = set(cloneDeep(initialAppState), "me.position.data", mockResponse)
      return expectSaga(Sagas.handleGet)
        .withReducer(AppReducer, initialAppState as any)
        .provide([[call(Facades.getCoordinates), mockResponse]])
        .put(Actions.Get.success(mockResponse))
        .hasFinalState(finalState)
        .run()
    })
    it("should make request, mutate state accordingly and push additional action, if response is successful and it's differ from user position", async () => {
      const mockResponse = { lat: 47.020123, lng: 28.829422 }
      let initialState = set(cloneDeep(initialAppState), "me.user.data", user)
      initialState = set(cloneDeep(initialState), "auth.authenticated", true)
      let finalState = set(cloneDeep(initialState), "me.position.data", mockResponse)
      finalState = set(cloneDeep(finalState), "me.user.fetching", true)
      return expectSaga(Sagas.handleGet)
        .withReducer(AppReducer, initialState as any)
        .provide([[call(Facades.getCoordinates), mockResponse]])
        .put(Actions.Get.success(mockResponse))
        .put(UserActions.UpdatePosition.request(mockResponse))
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
