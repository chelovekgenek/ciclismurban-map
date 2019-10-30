import { takeLatest, call, put } from "redux-saga/effects"
import { history } from "store/history"
import { AxiosResponse } from "axios"

import { AuthResponseModel } from "models/user"
import { ROUTES_INDEX_PATH } from "constants/routes"

import { LoginActions, LoginByTokenActions, RegisterActions } from "./actions"
import { RegisterTypes, LoginByTokenTypes, LogoutType, LoginTypes } from "./types"
import * as api from "./api"

function* handleLogin({ payload }: ReturnType<typeof LoginActions.request>) {
  try {
    const { data }: AxiosResponse<AuthResponseModel> = yield call(api.login, payload)

    yield put(LoginActions.success(data))
    yield call(history.replace, { pathname: ROUTES_INDEX_PATH })
  } catch (e) {
    yield put(LoginActions.failure(e.response.status))
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
    yield call(history.replace, { pathname: ROUTES_INDEX_PATH })
  } catch (e) {
    yield put(RegisterActions.failure(e.response.status))
  }
}

function* handleLogout() {
  yield call(history.replace, { pathname: ROUTES_INDEX_PATH })
}

export default function*() {
  yield takeLatest(RegisterTypes.REQUEST, handleRegister)
  yield takeLatest(LoginTypes.REQUEST, handleLogin)
  yield takeLatest(LoginByTokenTypes.REQUEST, handleLoginByToken)
  yield takeLatest(LogoutType, handleLogout)
}
