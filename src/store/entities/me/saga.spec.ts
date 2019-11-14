import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import user from "mocks/user.json"

import * as saga from "./saga"
import * as action from "./actions"
import userReducer, { initialState as meInitialState } from "./reducer"
import * as api from "./api"
import { wrapCall } from "helpers/saga"
import { uploadFile } from "../../commons"

describe("auth.saga", () => {
  describe("handleGet", () => {
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: user,
      }
      return expectSaga(saga.handleGet)
        .withReducer(userReducer)
        .provide([[call(api.getMe), mockResponse]])
        .put(action.MeGetActions.success(mockResponse.data as any))
        .hasFinalState({
          ...meInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(saga.handleGet)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.getMe, () => new Promise((_r, reject) => reject())) }])
        .put(action.MeGetActions.failure())
        .hasFinalState({ ...meInitialState, error: undefined })
        .run())
  })
  describe("handleUpdateProfile", () => {
    const a = action.MeUpdateProfileActions.request(user.profile)
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      const mockResponse = {
        data: user,
      }
      return expectSaga(saga.handleUpdateProfile, a)
        .withReducer(userReducer)
        .provide([
          [call(uploadFile, user.profile.avatar), undefined],
          [call(api.updateMeProfile, user.profile), mockResponse],
        ])
        .put(action.MeUpdateProfileActions.success(mockResponse.data as any))
        .hasFinalState({
          ...meInitialState,
          data: mockResponse.data,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(saga.handleUpdateProfile, a)
        .withReducer(userReducer)
        .provide([
          [call(uploadFile, user.profile.avatar), undefined],
          { call: wrapCall(api.updateMeProfile, () => new Promise((_r, reject) => reject())) },
        ])
        .put(action.MeUpdateProfileActions.failure())
        .hasFinalState({ ...meInitialState, error: undefined })
        .run())
  })
})
