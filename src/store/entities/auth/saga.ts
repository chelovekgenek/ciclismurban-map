import { takeLatest, call, put } from "redux-saga/effects"
import { history } from "store/history"
import { AxiosResponse } from "axios"

import { ROUTES_INDEX_PATH } from "constants/routes"

import * as Actions from "./auth.actions"
import * as Types from "./auth.types"
import * as Facades from "./auth.facades"
import { User } from "../me"

export function* handleLogin({ payload }: ReturnType<typeof Actions.Login.request>) {
  try {
    const { data }: AxiosResponse<Types.AuthResponseModel> = yield call(Facades.login, payload)
    yield put(Actions.Login.success(data))
  } catch (e) {
    yield put(Actions.Login.failure(e.response.status))
  }
}

export function* handleLoginByToken() {
  try {
    const { data }: AxiosResponse<Types.AuthResponseModel> = yield call(Facades.loginByToken)
    yield put(Actions.LoginByToken.success(data))
  } catch (e) {
    yield put(Actions.LoginByToken.failure())
  }
}

export function* handleLoginByGoogle({ payload }: ReturnType<typeof Actions.LoginByGoogle.request>) {
  try {
    const { data }: AxiosResponse<Types.AuthResponseModel> = yield call(Facades.loginByGoogle, payload)
    yield put(Actions.LoginByGoogle.success(data))
  } catch (e) {
    yield put(Actions.LoginByGoogle.failure())
  }
}

export function* handleLoginByFacebook({ payload }: ReturnType<typeof Actions.LoginByFacebook.request>) {
  try {
    const { data }: AxiosResponse<Types.AuthResponseModel> = yield call(Facades.loginByFacebook, payload)
    yield put(Actions.LoginByFacebook.success(data))
  } catch (e) {
    yield put(Actions.LoginByFacebook.failure())
  }
}

export function* handleRegister({ payload }: ReturnType<typeof Actions.Register.request>) {
  try {
    const { data }: AxiosResponse<Types.AuthResponseModel> = yield call(Facades.register, payload)
    yield put(Actions.Register.success(data))
  } catch (e) {
    yield put(Actions.Register.failure(e.response.status))
  }
}

export function* retreiveMe() {
  yield put(User.Actions.Get.request())
}

export function* replaceToIndexRoute() {
  yield call(history.replace, { pathname: ROUTES_INDEX_PATH })
}

export default function*() {
  yield takeLatest(Types.Register.REQUEST, handleRegister)
  yield takeLatest(Types.Login.REQUEST, handleLogin)
  yield takeLatest(Types.LoginByToken.REQUEST, handleLoginByToken)
  yield takeLatest(Types.LoginByGoogle.REQUEST, handleLoginByGoogle)
  yield takeLatest(Types.LoginByFacebook.REQUEST, handleLoginByFacebook)
  yield takeLatest(
    [
      Types.Login.SUCCESS,
      Types.LoginByToken.SUCCESS,
      Types.LoginByGoogle.SUCCESS,
      Types.LoginByFacebook.SUCCESS,
      Types.Register.SUCCESS,
    ],
    retreiveMe,
  )
  yield takeLatest(
    [
      Types.Logout,
      Types.Login.SUCCESS,
      Types.LoginByGoogle.SUCCESS,
      Types.LoginByFacebook.SUCCESS,
      Types.Register.SUCCESS,
    ],
    replaceToIndexRoute,
  )
}
