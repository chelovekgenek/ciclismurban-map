import { takeLatest, select, put, take, race, call, delay } from "redux-saga/effects"

import { getCurrentLatLng } from "helpers/geolocation"

import {
  types,
  toggle,
  pollingCurrentStart,
  pollingCurrentStop,
  requestGetCurrent,
  failureGetCurrent,
  successGetCurrent,
} from "./actions"
import { getFilters } from "./selectors"

function* handleToggle({ payload }: ReturnType<typeof toggle>) {
  const filters: ReturnType<typeof getFilters> = yield select(getFilters)
  if (payload === "current" && filters.current) {
    yield put(pollingCurrentStart())
  }
  if (payload === "current" && !filters.current) {
    yield put(pollingCurrentStop())
  }
}

function* handleGetCurrent() {
  try {
    const data: IPoint = yield call(getCurrentLatLng)
    yield put(successGetCurrent(data))
  } catch (e) {
    yield put(failureGetCurrent(e))
    if (e.code === 1) {
      yield put(pollingCurrentStop())
      yield delay(2000)
      yield put(toggle("current"))
    }
  }
}

function* handlePollingCurrent() {
  while (true) {
    yield put(requestGetCurrent())
    yield delay(10000)
  }
}

export function* watcher() {
  yield takeLatest(types.TOGGLE, handleToggle)
  yield takeLatest(types.CURRENT__GET__REQUEST, handleGetCurrent)

  while (true) {
    yield take(types.CURRENT__POLLING__START)
    yield race({
      task: call(handlePollingCurrent),
      cancel: take(types.CURRENT__POLLING__STOP),
    })
  }
}
