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
  successGetParkings,
  successGetServices,
  failureGetParkings,
  failureGetServices,
  successGetShops,
  failureGetShops,
  requestGetSelected,
  successGetSelected,
  failureGetSelected,
} from "./actions"
import { getFilters } from "./selectors"
import { getParkings, getServices, getShops, getParkingById, getServiceById, getShopById } from "./api"
import { AxiosResponse } from "axios"
import { IPoint, ILocation, TAcceptedEntity, TRequiredLocation } from "./interface"

function* handleToggle({ payload }: ReturnType<typeof toggle>) {
  const filters: ReturnType<typeof getFilters> = yield select(getFilters)
  if (payload === "current" && filters.current) {
    yield put(pollingCurrentStart())
  }
  if (payload === "current" && !filters.current) {
    yield put(pollingCurrentStop())
  }
}

function* handlePollingCurrent() {
  while (true) {
    yield put(requestGetCurrent())
    yield delay(10000)
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

function* handleGetParkings() {
  try {
    const { data }: AxiosResponse<ILocation[]> = yield call(getParkings)
    yield put(successGetParkings(data))
  } catch (e) {
    yield put(failureGetParkings(e))
  }
}

function* handleGetServices() {
  try {
    const { data }: AxiosResponse<ILocation[]> = yield call(getServices)
    yield put(successGetServices(data))
  } catch (e) {
    yield put(failureGetServices(e))
  }
}

function* handleGetShops() {
  try {
    const { data }: AxiosResponse<ILocation[]> = yield call(getShops)
    yield put(successGetShops(data))
  } catch (e) {
    yield put(failureGetShops(e))
  }
}

function* handleGetSelected({ payload }: ReturnType<typeof requestGetSelected>) {
  const mapEntityByApiCall: { [key in TAcceptedEntity]: (id: string) => Promise<AxiosResponse<any>> } = {
    parkings: getParkingById,
    services: getServiceById,
    shops: getShopById,
  }
  try {
    const { data }: AxiosResponse<TRequiredLocation> = yield call(mapEntityByApiCall[payload.entity], payload.uuid)
    yield put(successGetSelected(data))
  } catch (e) {
    yield put(failureGetSelected(e))
  }
}

export function* watcher() {
  yield takeLatest(types.TOGGLE, handleToggle)
  yield takeLatest(types.CURRENT__GET__REQUEST, handleGetCurrent)
  yield takeLatest(types.PARKINGS__GET__REQUEST, handleGetParkings)
  yield takeLatest(types.SERVICES__GET__REQUEST, handleGetServices)
  yield takeLatest(types.SHOPS__GET__REQUEST, handleGetShops)
  yield takeLatest(types.SELECTED__GET__REQUEST, handleGetSelected)

  while (true) {
    yield take(types.CURRENT__POLLING__START)
    yield race({
      task: call(handlePollingCurrent),
      cancel: take(types.CURRENT__POLLING__STOP),
    })
  }
}
