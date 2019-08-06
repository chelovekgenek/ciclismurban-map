import { takeLatest, select, put, take, race, call, delay } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { getCurrentLatLng } from "helpers/geolocation"
import { LocationModel, PointModel } from "models/location"

import { getFilters } from "./selectors"
import * as api from "./api"
import { TAcceptedEntity } from "./types"
import {
  FiltersTypes,
  CurrentTypes,
  ParkingsTypes,
  ServicesTypes,
  ShopsTypes,
  SelectedTypes,
  FiltersActions,
  SelectedActions,
  CurrentActions,
  ParkingsActions,
  ServicesActions,
  ShopsActions,
  EventsTypes,
  EventsActions,
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
    const { data }: AxiosResponse<LocationModel[]> = yield call(api.getParkings)
    yield put(ParkingsActions.successGet(data))
  } catch (e) {
    yield put(ParkingsActions.failureGet(e))
  }
}

function* handleGetServices() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(api.getServices)
    yield put(ServicesActions.successGet(data))
  } catch (e) {
    yield put(ServicesActions.failureGet(e))
  }
}

function* handleCreateEvent({ payload }: ReturnType<typeof EventsActions.requestCreate>) {
  try {
    const { data }: AxiosResponse<LocationModel> = yield call(api.createEvent, payload)
    yield put(EventsActions.successCreate(data))
  } catch (e) {
    yield put(EventsActions.failureCreate(e))
  }
}

function* handleGetShops() {
  try {
    const { data }: AxiosResponse<LocationModel[]> = yield call(api.getShops)
    yield put(ShopsActions.successGet(data))
  } catch (e) {
    yield put(ShopsActions.failureGet(e))
  }
}

function* handleGetSelected({ payload }: ReturnType<typeof SelectedActions.requestGet>) {
  const mapEntityByApiCall: { [key in TAcceptedEntity]: (id: string) => Promise<AxiosResponse<any>> } = {
    parkings: api.getParkingById,
    services: api.getServiceById,
    shops: api.getShopById,
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
  yield takeLatest(EventsTypes.CREATE__REQUEST, handleCreateEvent)
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
