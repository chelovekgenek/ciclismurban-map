import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { LocationModel } from "models/location"

import { getServices } from "../api"
import { ServicesActions, ServicesTypes } from "../actions"

function* handleGet() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(getServices)
    yield put(ServicesActions.successGet(data))
  } catch (e) {
    yield put(ServicesActions.failureGet(e))
  }
}

export function* watcher() {
  yield takeLatest(ServicesTypes.GET__REQUEST, handleGet)
}
