import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { LocationModel } from "models/location"

import { SelectedTypes, SelectedActions } from "../actions"
import { getParkingById, getServiceById, getShopById } from "../api"
import { TAcceptedEntity } from "../types"

function* handleGet({ payload }: ReturnType<typeof SelectedActions.requestGet>) {
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
  yield takeLatest(SelectedTypes.GET__REQUEST, handleGet)
}
