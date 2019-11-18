import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { extend } from "lodash-es"
import { ParkingModel } from "@ciclismurban/models"

import { history } from "store/history"
import { uploadFile } from "store/commons"

import { Actions as SelectedActions } from "../selected"
import * as Types from "./parkings.types"
import * as Actions from "./parkings.actions"
import * as Facades from "./parkings.facades"

export function* handleGet() {
  try {
    const { data }: AxiosResponse<ParkingModel[]> = yield call(Facades.getAll)
    yield put(Actions.Get.success(data))
  } catch (e) {
    yield put(Actions.Get.failure())
  }
}

export function* handleCreate({ payload: { image, ...payload } }: ReturnType<typeof Actions.Create.request>) {
  try {
    const link: string = yield call(uploadFile, image!)
    const { data }: AxiosResponse<ParkingModel> = yield call(Facades.create, { ...payload, image: link })
    yield put(Actions.Create.success(data))
    yield call(history.replace, { pathname: "/parkings" })
  } catch (e) {
    yield put(Actions.Create.failure())
  }
}

export function* handleUpdate({ payload: { uuid, payload } }: ReturnType<typeof Actions.Update.request>) {
  try {
    const reqPayload = extend(payload, {
      image: yield call(uploadFile, payload.image),
    })
    const { data }: AxiosResponse<ParkingModel> = yield call(Facades.updateById, uuid, reqPayload)
    yield put(Actions.Update.success(data))
    yield put(SelectedActions.set(data))
  } catch (e) {
    yield put(Actions.Update.failure())
  }
}

export function* handleDelete({ payload }: ReturnType<typeof Actions.Delete.request>) {
  try {
    const { data }: AxiosResponse<string> = yield call(Facades.deleteById, payload)
    yield put(Actions.Delete.success(data))
  } catch (e) {
    yield put(Actions.Delete.failure())
  }
}

export default function* watcher() {
  yield takeLatest(Types.Get.REQUEST, handleGet)
  yield takeLatest(Types.Create.REQUEST, handleCreate)
  yield takeLatest(Types.Update.REQUEST, handleUpdate)
  yield takeLatest(Types.Delete.REQUEST, handleDelete)
}
