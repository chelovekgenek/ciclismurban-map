import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { LocationModel } from "models/location"

import { ParkingsGetActions, ParkingsGetTypes } from "../actions"
import { getParkings } from "../api"

function* handleGet() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(getParkings)
    yield put(ParkingsGetActions.success(data))
  } catch (e) {
    yield put(ParkingsGetActions.failure(e))
  }
}

export function* watcher() {
  yield takeLatest(ParkingsGetTypes.REQUEST, handleGet)
}
