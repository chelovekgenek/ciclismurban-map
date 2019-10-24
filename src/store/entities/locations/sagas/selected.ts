import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { LocationModel } from "models/location"

import { SelectedGetActions, SelectedGetTypes } from "../actions"
import { getParkingById, getServiceById, getShopById, getEventById } from "../api"
import { TAcceptedEntity } from "../types"

type HandleGetAction = ReturnType<typeof SelectedGetActions.request>
function* handleGet({ payload }: HandleGetAction) {
  const mapEntityByApiCall: { [key in TAcceptedEntity]: (id: string) => Promise<AxiosResponse<any>> } = {
    events: getEventById,
    parkings: getParkingById,
    services: getServiceById,
    shops: getShopById,
  }
  try {
    const { data }: AxiosResponse<LocationModel> = yield call(mapEntityByApiCall[payload.entity], payload.uuid)
    yield put(SelectedGetActions.success(data))
  } catch (e) {
    yield put(SelectedGetActions.failure(e))
  }
}

export function* watcher() {
  yield takeLatest(SelectedGetTypes.REQUEST, handleGet)
}
