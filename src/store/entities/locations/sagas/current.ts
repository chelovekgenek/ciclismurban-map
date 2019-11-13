import { takeLatest, put, take, race, call, delay } from "redux-saga/effects"
import { PointModel } from "@ciclismurban/models"

import { getCurrentLatLng } from "helpers"

import { CurrentTypes, CurrentActions, FiltersActions } from "../actions"

function* handlePolling() {
  while (true) {
    yield put(CurrentActions.requestGet())
    yield delay(10000)
  }
}

function* handleGet() {
  try {
    const data: PointModel = yield call(getCurrentLatLng)
    yield put(CurrentActions.successGet(data))
  } catch (e) {
    yield put(CurrentActions.failureGet(e))
    if (e.code === 1) {
      yield put(CurrentActions.pollingStop())
      yield delay(2000)
      yield put(FiltersActions.toggle("current"))
    }
  }
}

export function* watcher() {
  yield takeLatest(CurrentTypes.GET__REQUEST, handleGet)

  while (true) {
    yield take(CurrentTypes.POLLING__START)
    yield race({
      task: call(handlePolling),
      cancel: take(CurrentTypes.POLLING__STOP),
    })
  }
}
