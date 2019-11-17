import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import * as api from "store/commons"
import { history } from "store/history"
import { wrapCall } from "helpers/testing-sagas"
import parkings from "mocks/parkings.json"

import * as Sagas from "./parkings.sagas"
import * as Actions from "./parkings.actions"
import * as Facades from "./parkings.facades"
import parkingsReducer, { initialState as parkingsInitialState } from "./parkings.reducer"

describe("locations/parkings/saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: parkings,
      }
      return expectSaga(Sagas.handleGet)
        .withReducer(parkingsReducer)
        .provide([[call(Facades.getAll), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...parkingsInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleGet)
        .withReducer(parkingsReducer)
        .provide([{ call: wrapCall(Facades.getAll, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Get.failure())
        .hasFinalState({ ...parkingsInitialState, error: true })
        .run())
  })
  describe("handleCreate", () => {
    const aсtion = Actions.Create.request(parkings[0] as any)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: parkings[0],
      }
      return expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(parkingsReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => mockResponse) },
        ])
        .put(Actions.Create.success(mockResponse.data as any))
        .call(history.replace, { pathname: "/parkings" })
        .hasFinalState({
          ...parkingsInitialState,
          data: [parkings[0]],
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(parkingsReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => new Promise((_r, reject) => reject())) },
        ])
        .put(Actions.Create.failure())
        .hasFinalState({ ...parkingsInitialState, error: true })
        .run())
  })
  describe("handleUpdate", () => {
    const aсtion = Actions.Update.request({ uuid: parkings[0].uuid, payload: { description: "qq" } })
    it("should make request and mutate reducer accordingly, if response is successful", () => {
      const mockResponse = {
        data: { ...parkings[0], ...aсtion.payload.payload },
      }
      return expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(parkingsReducer, { ...parkingsInitialState, data: parkings as any })
        .provide([{ call: wrapCall(Facades.updateById, () => mockResponse) }])
        .put(Actions.Update.success(mockResponse.data as any))
        .hasFinalState({
          ...parkingsInitialState,
          data: parkings.map(item => (item.uuid === aсtion.payload.uuid ? mockResponse.data : item)),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(parkingsReducer)
        .provide([{ call: wrapCall(Facades.updateById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Update.failure())
        .hasFinalState({ ...parkingsInitialState, error: true })
        .run())
  })
  describe("handleDelete", () => {
    const aсtion = Actions.Delete.request(parkings[0].uuid)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: parkings[0].uuid,
      }
      return expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(parkingsReducer, { ...parkingsInitialState, data: parkings as any })
        .provide([{ call: wrapCall(Facades.deleteById, () => mockResponse) }])
        .put(Actions.Delete.success(mockResponse.data))
        .hasFinalState({
          ...parkingsInitialState,
          data: parkings.filter(item => item.uuid !== parkings[0].uuid),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(parkingsReducer)
        .provide([{ call: wrapCall(Facades.deleteById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Delete.failure())
        .hasFinalState({ ...parkingsInitialState, error: true })
        .run())
  })
})
