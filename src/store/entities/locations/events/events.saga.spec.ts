import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import * as api from "store/commons"
import { history } from "store/history"
import { wrapCall } from "helpers/testing-sagas"
import events from "mocks/events.json"

import * as Sagas from "./events.sagas"
import * as Actions from "./events.actions"
import * as Facades from "./events.facades"
import eventsReducer, { initialState as eventsInitialState } from "./events.reducer"

describe("locations/events/saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: events,
      }
      return expectSaga(Sagas.handleGet)
        .withReducer(eventsReducer)
        .provide([[call(Facades.getAll), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...eventsInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleGet)
        .withReducer(eventsReducer)
        .provide([{ call: wrapCall(Facades.getAll, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Get.failure())
        .hasFinalState({ ...eventsInitialState, error: undefined })
        .run())
  })
  describe("handleCreate", () => {
    const aсtion = Actions.Create.request(events[0] as any)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: events[0],
      }
      return expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(eventsReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => mockResponse) },
        ])
        .put(Actions.Create.success(mockResponse.data as any))
        .call(history.replace, { pathname: "/events" })
        .hasFinalState({
          ...eventsInitialState,
          data: [events[0]],
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleCreate, aсtion)
        .withReducer(eventsReducer)
        .provide([
          [call(api.uploadFile, undefined), "link-to-image"],
          { call: wrapCall(Facades.create, () => new Promise((_r, reject) => reject())) },
        ])
        .put(Actions.Create.failure())
        .hasFinalState({ ...eventsInitialState, error: undefined })
        .run())
  })
  describe("handleUpdate", () => {
    const aсtion = Actions.Update.request({ uuid: events[0].uuid, payload: { description: "qq" } })
    it("should make request and mutate reducer accordingly, if response is successful", () => {
      const mockResponse = {
        data: { ...events[0], ...aсtion.payload.payload },
      }
      return expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(eventsReducer, { ...eventsInitialState, data: events as any })
        .provide([{ call: wrapCall(Facades.updateById, () => mockResponse) }])
        .put(Actions.Update.success(mockResponse.data as any))
        .hasFinalState({
          ...eventsInitialState,
          data: events.map(item => (item.uuid === aсtion.payload.uuid ? mockResponse.data : item)),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleUpdate, aсtion)
        .withReducer(eventsReducer)
        .provide([{ call: wrapCall(Facades.updateById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Update.failure())
        .hasFinalState({ ...eventsInitialState, error: undefined })
        .run())
  })
  describe("handleDelete", () => {
    const aсtion = Actions.Delete.request(events[0].uuid)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: events[0].uuid,
      }
      return expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(eventsReducer, { ...eventsInitialState, data: events as any })
        .provide([{ call: wrapCall(Facades.deleteById, () => mockResponse) }])
        .put(Actions.Delete.success(mockResponse.data))
        .hasFinalState({
          ...eventsInitialState,
          data: events.filter(item => item.uuid !== events[0].uuid),
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", () =>
      expectSaga(Sagas.handleDelete, aсtion)
        .withReducer(eventsReducer)
        .provide([{ call: wrapCall(Facades.deleteById, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Delete.failure())
        .hasFinalState({ ...eventsInitialState, error: undefined })
        .run())
  })
})
