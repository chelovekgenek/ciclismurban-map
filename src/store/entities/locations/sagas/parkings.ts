import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { extend } from "lodash-es"
import { ParkingModel } from "@ciclismurban/models"

import { history } from "store/history"

import {
  ParkingsGetActions,
  ParkingsGetTypes,
  ParkingsCreateTypes,
  ParkingsUpdateTypes,
  ParkingsDeleteTypes,
  ParkingsDeleteActions,
  ParkingsCreateActions,
  ParkingsUpdateActions,
  SelectedActions,
} from "../actions"
import { getParkings, uploadFile, createParking, updateParking, deleteParking } from "../api"

function* handleGet() {
  try {
    const { data }: AxiosResponse<ParkingModel[]> = yield call(getParkings)
    yield put(ParkingsGetActions.success(data))
  } catch (e) {
    yield put(ParkingsGetActions.failure(e))
  }
}

function* handleCreate({ payload: { image, ...payload } }: ReturnType<typeof ParkingsCreateActions.request>) {
  try {
    const { data: link }: AxiosResponse<string> = yield call(uploadFile, image!)
    const { data }: AxiosResponse<ParkingModel> = yield call(createParking, { ...payload, image: link })
    yield put(ParkingsCreateActions.success(data))
    yield call(history.replace, { pathname: "/parkings" })
  } catch (e) {
    yield put(ParkingsCreateActions.failure(e))
  }
}

function* handleUpdate({ payload: { uuid, payload } }: ReturnType<typeof ParkingsUpdateActions.request>) {
  try {
    const reqPayload = extend(payload, {
      image: payload.image ? (yield call(uploadFile, payload.image)).data : undefined,
    })
    const { data }: AxiosResponse<ParkingModel> = yield call(updateParking, uuid, reqPayload)
    yield put(ParkingsUpdateActions.success(data))
    yield put(SelectedActions.set(data))
  } catch (e) {
    yield put(ParkingsUpdateActions.failure(e))
  }
}

function* handleDelete({ payload }: ReturnType<typeof ParkingsDeleteActions.request>) {
  try {
    const { data }: AxiosResponse<string> = yield call(deleteParking, payload)
    yield put(ParkingsDeleteActions.success(data))
  } catch (e) {
    yield put(ParkingsDeleteActions.failure(e))
  }
}

export function* watcher() {
  yield takeLatest(ParkingsGetTypes.REQUEST, handleGet)
  yield takeLatest(ParkingsCreateTypes.REQUEST, handleCreate)
  yield takeLatest(ParkingsUpdateTypes.REQUEST, handleUpdate)
  yield takeLatest(ParkingsDeleteTypes.REQUEST, handleDelete)
}
