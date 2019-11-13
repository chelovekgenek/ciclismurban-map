import { takeLatest, call, put } from "redux-saga/effects"
import { history } from "store/history"
import { AxiosResponse } from "axios"

import { ROUTES_INDEX_PATH } from "constants/routes"

import * as action from "./actions"
import * as type from "./types"
import * as api from "./api"

export function* handleLogin({ payload }: ReturnType<typeof action.LoginActions.request>) {
  try {
    const { data }: AxiosResponse<type.AuthResponseModel> = yield call(api.login, payload)
    yield put(action.LoginActions.success(data))
  } catch (e) {
    yield put(action.LoginActions.failure(e.response.status))
  }
}

export function* handleLoginByToken() {
  try {
    const { data }: AxiosResponse<type.AuthResponseModel> = yield call(api.loginByToken)
    yield put(action.LoginByTokenActions.success(data))
  } catch (e) {
    yield put(action.LoginByTokenActions.failure())
  }
}

export function* handleLoginByGoogle({ payload }: ReturnType<typeof action.LoginByGoogleActions.request>) {
  try {
    const { data }: AxiosResponse<type.AuthResponseModel> = yield call(api.loginByGoogle, payload)
    yield put(action.LoginByGoogleActions.success(data))
  } catch (e) {
    yield put(action.LoginByGoogleActions.failure())
  }
}

export function* handleLoginByFacebook({ payload }: ReturnType<typeof action.LoginByFacebookActions.request>) {
  try {
    const { data }: AxiosResponse<type.AuthResponseModel> = yield call(api.loginByFacebook, payload)
    yield put(action.LoginByFacebookActions.success(data))
  } catch (e) {
    yield put(action.LoginByFacebookActions.failure())
  }
}

export function* handleRegister({ payload }: ReturnType<typeof action.RegisterActions.request>) {
  try {
    const { data }: AxiosResponse<type.AuthResponseModel> = yield call(api.register, payload)
    yield put(action.RegisterActions.success(data))
  } catch (e) {
    yield put(action.RegisterActions.failure(e.response.status))
  }
}

export function* replaceToIndexRoute() {
  yield call(history.replace, { pathname: ROUTES_INDEX_PATH })
}

export default function*() {
  yield takeLatest(type.RegisterTypes.REQUEST, handleRegister)
  yield takeLatest(type.LoginTypes.REQUEST, handleLogin)
  yield takeLatest(type.LoginByTokenTypes.REQUEST, handleLoginByToken)
  yield takeLatest(type.LoginByGoogleTypes.REQUEST, handleLoginByGoogle)
  yield takeLatest(type.LoginByFacebookTypes.REQUEST, handleLoginByFacebook)
  yield takeLatest(
    [
      type.LogoutType,
      type.LoginTypes.SUCCESS,
      type.LoginByGoogleTypes.SUCCESS,
      type.LoginByFacebookTypes.SUCCESS,
      type.RegisterTypes.SUCCESS,
    ],
    replaceToIndexRoute,
  )
}
