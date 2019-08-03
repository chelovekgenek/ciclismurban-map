import { takeLatest, select, put, take, race, call, delay } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { getCurrentLatLng } from "helpers/geolocation"
import { LocationModel, PointModel } from "models/location"

import { getFilters } from "./selectors"
import { getParkings, getServices, getShops, getParkingById, getServiceById, getShopById } from "./api"
import {
  TAcceptedEntity,
  FiltersTypes,
  CurrentTypes,
  ParkingsTypes,
  ServicesTypes,
  ShopsTypes,
  SelectedTypes,
} from "./types"
import {
  FiltersActions,
  SelectedActions,
  CurrentActions,
  ParkingsActions,
  ServicesActions,
  ShopsActions,
} from "./actions"

function* handleToggle({ payload }: ReturnType<typeof FiltersActions.toggle>) {
  const filters: ReturnType<typeof getFilters> = yield select(getFilters)
  if (payload === "current" && filters.current) {
    yield put(CurrentActions.pollingStart())
  }
  if (payload === "current" && !filters.current) {
    yield put(CurrentActions.pollingStop())
  }
}

function* handlePollingCurrent() {
  while (true) {
    yield put(CurrentActions.requestGet())
    yield delay(10000)
  }
}

function* handleGetCurrent() {
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

function* handleGetParkings() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(getParkings)
    yield put(ParkingsActions.successGet(data))
  } catch (e) {
    yield put(ParkingsActions.failureGet(e))
  }
}

function* handleGetServices() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(getServices)
    yield put(ServicesActions.successGet(data))
  } catch (e) {
    yield put(ServicesActions.failureGet(e))
  }
}

function* handleGetShops() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(getShops)
    yield put(ShopsActions.successGet(data))
  } catch (e) {
    yield put(ShopsActions.failureGet(e))
  }
}

function* handleGetSelected({ payload }: ReturnType<typeof SelectedActions.requestGet>) {
  const mapEntityByApiCall: { [key in TAcceptedEntity]: (id: string) => Promise<AxiosResponse<any>> } = {
    parkings: getParkingById,
    services: getServiceById,
    shops: getShopById,
  }
  try {
    const { data }: AxiosResponse<LocationModel> = yield call(mapEntityByApiCall[payload.entity], payload.uuid)
    yield put(SelectedActions.successGet(data))
  } catch (e) {
    yield put(SelectedActions.failureGet(e))
  }
}

export function* watcher() {
  yield takeLatest(FiltersTypes.TOGGLE, handleToggle)
  yield takeLatest(CurrentTypes.GET__REQUEST, handleGetCurrent)
  yield takeLatest(ParkingsTypes.GET__REQUEST, handleGetParkings)
  yield takeLatest(ServicesTypes.GET__REQUEST, handleGetServices)
  yield takeLatest(ShopsTypes.GET__REQUEST, handleGetShops)
  yield takeLatest(SelectedTypes.GET__REQUEST, handleGetSelected)

  while (true) {
    yield take(CurrentTypes.POLLING__START)
    yield race({
      task: call(handlePollingCurrent),
      cancel: take(CurrentTypes.POLLING__STOP),
    })
  }
}
