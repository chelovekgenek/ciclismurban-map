import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { LocationModel } from "@ciclismurban/models"

import * as Actions from "./selected.actions"
import * as Types from "./selected.types"
import { getParkingById, getServiceById, getShopById, getEventById } from "./selected.facades"

export function* handleGet({ payload }: ReturnType<typeof Actions.Get.request>) {
  const mapEntityByApiCall: { [key in Types.TAcceptedEntity]: (id: string) => Promise<AxiosResponse<any>> } = {
    events: getEventById,
    parkings: getParkingById,
    services: getServiceById,
    shops: getShopById,
  }
  try {
    const { data }: AxiosResponse<LocationModel> = yield call(mapEntityByApiCall[payload.entity], payload.uuid)
    yield put(Actions.Get.success(data))
  } catch (e) {
    yield put(Actions.Get.failure())
  }
}

export default function* watcher() {
  yield takeLatest(Types.Get.REQUEST, handleGet)
}
