import { expectSaga } from "redux-saga-test-plan"
import { call } from "redux-saga/effects"

import { wrapCall } from "helpers/testing-sagas"
import { history } from "store"
import user from "mocks/user.json"

import * as Sagas from "./saga"
import * as Actions from "./auth.actions"
import * as Facades from "./auth.facades"
import userReducer, { initialState as userInitialState } from "./auth.reducer"
import { User } from "../me"

describe("auth.saga", () => {
  const mockResponse = {
    data: {
      token: "secret",
      data: user,
    },
  }
  describe("handleLogin", () => {
    const a = Actions.Login.request({ email: user.email, password: "password" })
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(Sagas.handleLogin, a)
        .withReducer(userReducer)
        .provide([[call(Facades.login, a.payload), mockResponse]])
        .put(Actions.Login.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () => {
      const payloadLoginError = { response: { status: 401 } }
      return expectSaga(Sagas.handleLogin, a)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(Facades.login, () => new Promise((_r, reject) => reject(payloadLoginError))) }])
        .put(Actions.Login.failure(401))
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
      expectSaga(Sagas.handleLoginByToken)
        .withReducer(userReducer)
        .provide([[call(Facades.loginByToken), mockResponse]])
        .put(Actions.LoginByToken.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleLoginByToken)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(Facades.loginByToken, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.LoginByToken.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleLoginByGoogle", () => {
    const a = Actions.LoginByGoogle.request("secret")
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(Sagas.handleLoginByGoogle, a)
        .withReducer(userReducer)
        .provide([[call(Facades.loginByGoogle, a.payload), mockResponse]])
        .put(Actions.LoginByGoogle.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleLoginByGoogle, a)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(Facades.loginByGoogle, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.LoginByGoogle.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleLoginByFacebook", () => {
    const a = Actions.LoginByFacebook.request("secret")
    it("should make request and mutate reducer accordingly, if response is successful", async () =>
      expectSaga(Sagas.handleLoginByFacebook, a)
        .withReducer(userReducer)
        .provide([[call(Facades.loginByFacebook, a.payload), mockResponse]])
        .put(Actions.LoginByFacebook.success(mockResponse.data as any))
        .hasFinalState({
          ...userInitialState,
          ...mockResponse.data,
          attempts: userInitialState.attempts + 1,
          authenticated: true,
        })
        .run())
    it("should make request and mutate reducer accordingly, if response is failure", async () =>
      expectSaga(Sagas.handleLoginByFacebook, a)
        .withReducer(userReducer)
        .provide([{ call: wrapCall(Facades.loginByFacebook, () => new Promise((_r, reject) => reject())) }])
        .put(Actions.LoginByFacebook.failure())
        .hasFinalState(userInitialState)
        .run())
  })
  describe("handleRegister", () => {
    const a = Actions.Register.request({ email: user.email, password: "password" })
    it("should make request and mutate reducer accordingly, if response is successful", async () => {
      return expectSaga(Sagas.handleRegister, a)
        .withReducer(userReducer)
        .provide([[call(Facades.register, a.payload), mockResponse]])
        .put(Actions.Register.success(mockResponse.data as any))
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
      const callRegisterError = wrapCall(
        Facades.register,
        () => new Promise((_r, reject) => reject(payloadRegisterError)),
      )
      return expectSaga(Sagas.handleRegister, a)
        .withReducer(userReducer)
        .provide([{ call: callRegisterError }])
        .put(Actions.Register.failure(payloadRegisterError.response.status))
        .hasFinalState({
          ...userInitialState,
          attempts: userInitialState.attempts + 1,
          error: payloadRegisterError.response.status,
        })
        .run()
    })
  })
  describe("retreiveMe", () => {
    it("should call replace", async () =>
      expectSaga(Sagas.retreiveMe)
        .put(User.Actions.Get.request())
        .run())
  })
  describe("replaceToIndexRoute", () => {
    it("should call replace", async () =>
      expectSaga(Sagas.replaceToIndexRoute)
        .call(history.replace, { pathname: "/" })
        .run())
  })
})
