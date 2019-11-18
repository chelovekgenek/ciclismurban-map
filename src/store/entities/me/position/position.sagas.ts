import { takeLatest, put, take, race, call, delay } from "redux-saga/effects"
import { PointModel } from "@ciclismurban/models"

import { Filters } from "store/entities/locations"

import * as Actions from "./position.actions"
import * as Types from "./position.types"
import * as Facades from "./position.facades"

export function* handlePolling() {
  while (true) {
    yield put(Actions.Get.request())
    yield delay(10000)
  }
}

export function* handleGet() {
  try {
    const data: PointModel = yield call(Facades.getCoordinates)
    yield put(Actions.Get.success(data))
  } catch (e) {
    yield put(Actions.Get.failure())
    if (e.code === 1) {
      yield put(Actions.Polling.stop())
      yield delay(2000)
      yield put(Filters.Actions.toggle("current"))
    }
  }
}

export default function* watcher() {
  yield takeLatest(Types.Get.REQUEST, handleGet)

  while (true) {
    yield take(Types.Polling.START)
    yield race({
      task: call(handlePolling),
      cancel: take(Types.Polling.STOP),
    })
  }
}
