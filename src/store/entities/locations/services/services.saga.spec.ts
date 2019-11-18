import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import * as api from "store/commons"
import { history } from "store/history"
import { wrapCall } from "helpers/testing-sagas"
import services from "mocks/services.json"

import * as Sagas from "./services.sagas"
import * as Actions from "./services.actions"
import * as Facades from "./services.facades"
import servicesReducer, { initialState as servicesInitialState } from "./services.reducer"

describe("locations/services/saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: services,
      }
      return expectSaga(Sagas.handleGet)
        .withReducer(servicesReducer)
        .provide([[call(Facades.getAll), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...servicesInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleGet)
        .withReducer(servicesReducer)
        .provide([{ call: wrapCall(Facades.getAll, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Get.failure())
        .hasFinalState({ ...servicesInitialState, error: true })
        .run())
  })
  describe("handleCreate", () => {
    const aсtion = Actions.Create.request(services[0] as any)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: services[0],
      }
      return expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(servicesReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => mockResponse) },
        ])
        .put(Actions.Create.success(mockResponse.data as any))
        .call(history.replace, { pathname: "/services" })
        .hasFinalState({
          ...servicesInitialState,
          data: [services[0]],
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(servicesReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => new Promise((_r, reject) => reject())) },
        ])
        .put(Actions.Create.failure())
        .hasFinalState({ ...servicesInitialState, error: true })
        .run())
  })
  describe("handleUpdate", () => {
    const aсtion = Actions.Update.request({ uuid: services[0].uuid, payload: { description: "qq" } })
    it("should make request and mutate reducer accordingly, if response is successful", () => {
      const mockResponse = {
        data: { ...services[0], ...aсtion.payload.payload },
      }
      return expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(servicesReducer, { ...servicesInitialState, data: services as any })
        .provide([{ call: wrapCall(Facades.updateById, () => mockResponse) }])
        .put(Actions.Update.success(mockResponse.data as any))
        .hasFinalState({
          ...servicesInitialState,
          data: services.map(item => (item.uuid === aсtion.payload.uuid ? mockResponse.data : item)),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(servicesReducer)
        .provide([{ call: wrapCall(Facades.updateById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Update.failure())
        .hasFinalState({ ...servicesInitialState, error: true })
        .run())
  })
  describe("handleDelete", () => {
    const aсtion = Actions.Delete.request(services[0].uuid)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: services[0].uuid,
      }
      return expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(servicesReducer, { ...servicesInitialState, data: services as any })
        .provide([{ call: wrapCall(Facades.deleteById, () => mockResponse) }])
        .put(Actions.Delete.success(mockResponse.data))
        .hasFinalState({
          ...servicesInitialState,
          data: services.filter(item => item.uuid !== services[0].uuid),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(servicesReducer)
        .provide([{ call: wrapCall(Facades.deleteById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Delete.failure())
        .hasFinalState({ ...servicesInitialState, error: true })
        .run())
  })
})
