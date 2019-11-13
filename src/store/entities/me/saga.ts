import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { UserModel } from "@ciclismurban/models"

import { MeGetActions } from "./actions"
import { MeGetTypes } from "./types"
import { getMe } from "./api"

export function* handleGet() {
  try {
    const { data }: AxiosResponse<UserModel> = yield call(getMe)
    yield put(MeGetActions.success(data))
  } catch (e) {
    yield put(MeGetActions.failure())
  }
}

export default function* watcher() {
  yield takeLatest(MeGetTypes.REQUEST, handleGet)
}
