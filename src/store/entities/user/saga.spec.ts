import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import { history } from "store"
import user from "mocks/user.json"

import * as saga from "./saga"
import * as action from "./actions"
import userReducer, { initialState as userInitialState } from "./reducer"
import * as api from "./api"
import { wrapCall } from "helpers/saga"

describe("user.saga", () => {
  const mockResponse = {
    data: {
      token: "secret",
      data: user,
    },
  }
  describe("handleLogin", () => {
    const a = action.LoginActions.request({ email: user.email, password: "password" })
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(saga.handleLogin, a)
        .withReducer(userReducer)
        .provide([[call(api.login, a.payload), mockResponse]])
        .put(action.LoginActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () => {
      const payloadLoginError = { response: { status: 401 } }
      return expectSaga(saga.handleLogin, a)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.login, () => new Promise((_r, reject) => reject(payloadLoginError))) }])
        .put(action.LoginActions.failure(401))
        .hasFinalState({
          ...userInitialState,
          attempts: userInitialState.attempts + 1,
          error: payloadLoginError.response.status,
        })
        .run()
    })
  })
  describe("handleLoginByToken", () => {
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(saga.handleLoginByToken)
        .withReducer(userReducer)
        .provide([[call(api.loginByToken), mockResponse]])
        .put(action.LoginByTokenActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(saga.handleLoginByToken)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.loginByToken, () => new Promise((_r, reject) => reject())) }])
        .put(action.LoginByTokenActions.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleLoginByGoogle", () => {
    const a = action.LoginByGoogleActions.request("secret")
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(saga.handleLoginByGoogle, a)
        .withReducer(userReducer)
        .provide([[call(api.loginByGoogle, a.payload), mockResponse]])
        .put(action.LoginByGoogleActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(saga.handleLoginByGoogle, a)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.loginByGoogle, () => new Promise((_r, reject) => reject())) }])
        .put(action.LoginByGoogleActions.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleLoginByFacebook", () => {
    const a = action.LoginByFacebookActions.request("secret")
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(saga.handleLoginByFacebook, a)
        .withReducer(userReducer)
        .provide([[call(api.loginByFacebook, a.payload), mockResponse]])
        .put(action.LoginByFacebookActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(saga.handleLoginByFacebook, a)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.loginByFacebook, () => new Promise((_r, reject) => reject())) }])
        .put(action.LoginByFacebookActions.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleRegister", () => {
    const a = action.RegisterActions.request({ email: user.email, password: "password" })
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      return expectSaga(saga.handleRegister, a)
        .withReducer(userReducer)
        .provide([[call(api.register, a.payload), mockResponse]])
        .put(action.RegisterActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run()
    })
    it("should make request and mutate reducer accordingly, if response is failure", async () => {
      const payloadRegisterError = { response: { status: 401 } }
      const callRegisterError = wrapCall(api.register, () => new Promise((_r, reject) => reject(payloadRegisterError)))
      return expectSaga(saga.handleRegister, a)
        .withReducer(userReducer)
        .provide([{ call: callRegisterError }])
        .put(action.RegisterActions.failure(payloadRegisterError.response.status))
        .hasFinalState({
          ...userInitialState,
          attempts: userInitialState.attempts + 1,
          error: payloadRegisterError.response.status,
        })
        .run()
    })
  })
  describe("replaceToIndexRoute", () => {
    it("should call replace", async () =>
      expectSaga(saga.replaceToIndexRoute)
        .call(history.replace, { pathname: "/" })
        .run())
  })
})
