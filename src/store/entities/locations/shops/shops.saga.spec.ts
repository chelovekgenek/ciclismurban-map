import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import * as api from "store/commons"
import { history } from "store/history"
import { wrapCall } from "helpers/testing-sagas"
import shops from "mocks/shops.json"

import * as Sagas from "./shops.sagas"
import * as Actions from "./shops.actions"
import * as Facades from "./shops.facades"
import shopsReducer, { initialState as shopsInitialState } from "./shops.reducer"

describe("locations/shops/saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: shops,
      }
      return expectSaga(Sagas.handleGet)
        .withReducer(shopsReducer)
        .provide([[call(Facades.getAll), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...shopsInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleGet)
        .withReducer(shopsReducer)
        .provide([{ call: wrapCall(Facades.getAll, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Get.failure())
        .hasFinalState({ ...shopsInitialState, error: true })
        .run())
  })
  describe("handleCreate", () => {
    const aсtion = Actions.Create.request(shops[0] as any)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: shops[0],
      }
      return expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(shopsReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => mockResponse) },
        ])
        .put(Actions.Create.success(mockResponse.data as any))
        .call(history.replace, { pathname: "/shops" })
        .hasFinalState({
          ...shopsInitialState,
          data: [shops[0]],
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(shopsReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => new Promise((_r, reject) => reject())) },
        ])
        .put(Actions.Create.failure())
        .hasFinalState({ ...shopsInitialState, error: true })
        .run())
  })
  describe("handleUpdate", () => {
    const aсtion = Actions.Update.request({ uuid: shops[0].uuid, payload: { description: "qq" } })
    it("should make request and mutate reducer accordingly, if response is successful", () => {
      const mockResponse = {
        data: { ...shops[0], ...aсtion.payload.payload },
      }
      return expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(shopsReducer, { ...shopsInitialState, data: shops as any })
        .provide([{ call: wrapCall(Facades.updateById, () => mockResponse) }])
        .put(Actions.Update.success(mockResponse.data as any))
        .hasFinalState({
          ...shopsInitialState,
          data: shops.map(item => (item.uuid === aсtion.payload.uuid ? mockResponse.data : item)),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(shopsReducer)
        .provide([{ call: wrapCall(Facades.updateById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Update.failure())
        .hasFinalState({ ...shopsInitialState, error: true })
        .run())
  })
  describe("handleDelete", () => {
    const aсtion = Actions.Delete.request(shops[0].uuid)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: shops[0].uuid,
      }
      return expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(shopsReducer, { ...shopsInitialState, data: shops as any })
        .provide([{ call: wrapCall(Facades.deleteById, () => mockResponse) }])
        .put(Actions.Delete.success(mockResponse.data))
        .hasFinalState({
          ...shopsInitialState,
          data: shops.filter(item => item.uuid !== shops[0].uuid),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(shopsReducer)
        .provide([{ call: wrapCall(Facades.deleteById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Delete.failure())
        .hasFinalState({ ...shopsInitialState, error: true })
        .run())
  })
})
