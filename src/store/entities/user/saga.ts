import { takeLatest, call, put } from "redux-saga/effects"
import { history } from "store/history"

import { LoginActions, LoginByTokenActions, RegisterActions } from "./actions"
import * as api from "./api"
import { AxiosResponse } from "axios"
import { AuthResponseModel } from "models/user"
import { RegisterTypes, LoginByTokenTypes, LogoutType, LoginTypes } from "./types"

function* handleLogin({ payload }: ReturnType<typeof LoginActions.request>) {
  console.log(payload)
  try {
    const { data }: AxiosResponse<AuthResponseModel> = yield call(api.login, payload)

    yield put(LoginActions.success(data))
    yield call(history.replace, { pathname: "/" })
  } catch (e) {
    yield put(LoginActions.failure(e))
  }
}

function* handleLoginByToken() {
  try {
    const { data }: AxiosResponse<AuthResponseModel> = yield call(api.loginByToken)
    yield put(LoginByTokenActions.success(data))
  } catch (e) {
    yield put(LoginByTokenActions.failure())
  }
}

function* handleRegister({ payload }: ReturnType<typeof RegisterActions.request>) {
  try {
    const { data }: AxiosResponse<AuthResponseModel> = yield call(api.register, payload)

    yield put(RegisterActions.success(data))
    yield call(history.replace, { pathname: "/" })
  } catch (e) {
    yield put(RegisterActions.failure(e))
  }
}

function* handleLogout() {
  yield call(history.replace, { pathname: "/" })
}

export function* watcher() {
  yield takeLatest(RegisterTypes.REQUEST, handleRegister)
  yield takeLatest(LoginTypes.REQUEST, handleLogin)
  yield takeLatest(LoginByTokenTypes.REQUEST, handleLoginByToken)
  yield takeLatest(LogoutType, handleLogout)
}
