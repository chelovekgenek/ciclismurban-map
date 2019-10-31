import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import { history } from "store"
import user from "mocks/user.json"

import { replaceToIndexRoute, handleLogin, handleLoginByToken, handleLoginByGoogle, handleRegister } from "./saga"
import { LoginActions, LoginByTokenActions, LoginByGoogleActions, RegisterActions } from "./actions"
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
    const action = LoginActions.request({ email: user.email, password: "password" })
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(handleLogin, action)
        .withReducer(userReducer)
        .provide([[call(api.login, action.payload), mockResponse]])
        .put(LoginActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () => {
      const payloadLoginError = { response: { status: 401 } }
      return expectSaga(handleLogin, action)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.login, () => new Promise((_r, reject) => reject(payloadLoginError))) }])
        .put(LoginActions.failure(401))
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
      expectSaga(handleLoginByToken)
        .withReducer(userReducer)
        .provide([[call(api.loginByToken), mockResponse]])
        .put(LoginByTokenActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(handleLoginByToken)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.loginByToken, () => new Promise((_r, reject) => reject())) }])
        .put(LoginByTokenActions.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleLoginByGoogle", () => {
    const action = LoginByGoogleActions.request("secret")
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(handleLoginByGoogle, action)
        .withReducer(userReducer)
        .provide([[call(api.loginByGoogle, action.payload), mockResponse]])
        .put(LoginByGoogleActions.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(handleLoginByGoogle, action)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(api.loginByGoogle, () => new Promise((_r, reject) => reject())) }])
        .put(LoginByGoogleActions.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleRegister", () => {
    const action = RegisterActions.request({ email: user.email, password: "password" })
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      return expectSaga(handleRegister, action)
        .withReducer(userReducer)
        .provide([[call(api.register, action.payload), mockResponse]])
        .put(RegisterActions.success(mockResponse.data as any))
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
      return expectSaga(handleRegister, action)
        .withReducer(userReducer)
        .provide([{ call: callRegisterError }])
        .put(RegisterActions.failure(401))
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
      expectSaga(replaceToIndexRoute)
        .call(history.replace, { pathname: "/" })
        .run())
  })
})
