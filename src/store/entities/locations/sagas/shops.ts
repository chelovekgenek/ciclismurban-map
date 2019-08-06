import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { LocationModel } from "models/location"

import { getShops } from "../api"
import { ShopsActions, ShopsTypes } from "../actions"

function* handleGet() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(getShops)
    yield put(ShopsActions.successGet(data))
  } catch (e) {
    yield put(ShopsActions.failureGet(e))
  }
}

export function* watcher() {
  yield takeLatest(ShopsTypes.GET__REQUEST, handleGet)
}
