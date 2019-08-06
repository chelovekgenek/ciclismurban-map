import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { LocationModel } from "models/location"

import { ParkingsTypes, ParkingsActions } from "../actions"
import { getParkings } from "../api"

function* handleGet() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(getParkings)
    yield put(ParkingsActions.successGet(data))
  } catch (e) {
    yield put(ParkingsActions.failureGet(e))
  }
}

export function* watcher() {
  yield takeLatest(ParkingsTypes.GET__REQUEST, handleGet)
}
