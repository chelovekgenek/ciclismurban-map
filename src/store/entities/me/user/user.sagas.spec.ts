import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import user from "mocks/user.json"
import { wrapCall } from "helpers/testing-sagas"

import * as Sagas from "./user.sagas"
import * as Actions from "./user.actions"
import * as Facades from "./user.facades"
import userReducer, { initialState as meInitialState } from "./user.reducer"
import { uploadFile } from "../../../commons"

describe("auth.saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: user,
      }
      return expectSaga(Sagas.handleGet)
        .withReducer(userReducer)
        .provide([[call(Facades.get), mockResponse]])
        .put(Actions.Get.success(mockResponse.data as any))
        .hasFinalState({
          ...meInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleGet)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(Facades.get, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.Get.failure())
        .hasFinalState({ ...meInitialState, error: undefined })
        .run())
  })
  describe("handleUpdateProfile", () => {
    const action = Actions.UpdateProfile.request(user.profile)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: user,
      }
      return expectSaga(Sagas.handleUpdateProfile, action)
        .withReducer(userReducer)
        .provide([
          [call(uploadFile, user.profile.avatar), undefined],
          [call(Facades.updateProfile, user.profile), mockResponse],
        ])
        .put(Actions.UpdateProfile.success(mockResponse.data as any))
        .hasFinalState({
          ...meInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleUpdateProfile, action)
        .withReducer(userReducer)
        .provide([
          [call(uploadFile, user.profile.avatar), undefined],
          { call: wrapCall(Facades.updateProfile, () => new Promise((_r, reject) => reject())) },
        ])
        .put(Actions.UpdateProfile.failure())
        .hasFinalState({ ...meInitialState, error: undefined })
        .run())
  })
})
