import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import events from "mocks/events.json"
import parkings from "mocks/parkings.json"
import services from "mocks/services.json"
import shops from "mocks/shops.json"

import * as Sagas from "./selected.sagas"
import * as Actions from "./selected.actions"
import * as Facades from "./selected.facades"
import selectedReducer, { initialState as selectedInitialState } from "./selected.reducer"
import { wrapCall } from "helpers"

describe("locations/selected/saga", () => {
  describe("handleGet", () => {
    it("should retreive `events` entity by id and mutate reducer accordingly, if response is successful", async () => {
      const action = Actions.Get.request({ uuid: "uuid", entity: "events" })
      const mockResponse = {
        data: events[0],
      }
      return expectSaga(Sagas.handleGet, action)
        .withReducer(selectedReducer)
        .provide([[call(Facades.getEventById, action.payload.uuid), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...selectedInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should retreive `parkings` entity by id and mutate reducer accordingly, if response is successful", async () => {
      const action = Actions.Get.request({ uuid: "uuid", entity: "parkings" })
      const mockResponse = {
        data: parkings[0],
      }
      return expectSaga(Sagas.handleGet, action)
        .withReducer(selectedReducer)
        .provide([[call(Facades.getParkingById, action.payload.uuid), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...selectedInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should retreive `services` entity by id and mutate reducer accordingly, if response is successful", async () => {
      const action = Actions.Get.request({ uuid: "uuid", entity: "services" })
      const mockResponse = {
        data: services[0],
      }
      return expectSaga(Sagas.handleGet, action)
        .withReducer(selectedReducer)
        .provide([[call(Facades.getServiceById, action.payload.uuid), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...selectedInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should retreive `shops` entity by id and mutate reducer accordingly, if response is successful", async () => {
      const action = Actions.Get.request({ uuid: "uuid", entity: "shops" })
      const mockResponse = {
        data: shops[0],
      }
      return expectSaga(Sagas.handleGet, action)
        .withReducer(selectedReducer)
        .provide([[call(Facades.getShopById, action.payload.uuid), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...selectedInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () => {
      const action = Actions.Get.request({ uuid: "uuid", entity: "shops" })
      return expectSaga(Sagas.handleGet, action)
        .withReducer(selectedReducer)
        .provide([{ call: wrapCall(Facades.getShopById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Get.failure())
        .hasFinalState({ ...selectedInitialState, error: true })
        .run()
    })
  })
})
