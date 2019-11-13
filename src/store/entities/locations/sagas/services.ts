import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { extend } from "lodash-es"
import { ServiceModel } from "@ciclismurban/models"

import { history } from "store/history"

import {
  ServicesGetActions,
  ServicesGetTypes,
  ServicesCreateTypes,
  ServicesUpdateTypes,
  ServicesDeleteTypes,
  ServicesCreateActions,
  ServicesUpdateActions,
  ServicesDeleteActions,
  SelectedActions,
} from "../actions"
import { getServices, uploadFile, createService, updateService, deleteService } from "../api"

function* handleGet() {
  try {
    const { data }: AxiosResponse<ServiceModel[]> = yield call(getServices)
    yield put(ServicesGetActions.success(data))
  } catch (e) {
    yield put(ServicesGetActions.failure(e))
  }
}

type THandleCreateAction = ReturnType<typeof ServicesCreateActions.request>
function* handleCreate({ payload: { image, ...payload } }: THandleCreateAction) {
  try {
    const { data: link }: AxiosResponse<string> = yield call(uploadFile, image!)
    const { data }: AxiosResponse<ServiceModel> = yield call(createService, { ...payload, image: link })
    yield put(ServicesCreateActions.success(data))
    yield call(history.replace, { pathname: "/services" })
  } catch (e) {
    yield put(ServicesCreateActions.failure(e))
  }
}

type THandleUpdateAction = ReturnType<typeof ServicesUpdateActions.request>
function* handleUpdate({ payload: { uuid, payload } }: THandleUpdateAction) {
  try {
    const reqPayload = extend(payload, {
      image: payload.image ? (yield call(uploadFile, payload.image)).data : undefined,
    })
    const { data }: AxiosResponse<ServiceModel> = yield call(updateService, uuid, reqPayload)
    yield put(ServicesUpdateActions.success(data))
    yield put(SelectedActions.set(data))
  } catch (e) {
    yield put(ServicesUpdateActions.failure(e))
  }
}

type THandleDeleteAction = ReturnType<typeof ServicesDeleteActions.request>
function* handleDelete({ payload }: THandleDeleteAction) {
  try {
    const { data }: AxiosResponse<string> = yield call(deleteService, payload)
    yield put(ServicesDeleteActions.success(data))
  } catch (e) {
    yield put(ServicesDeleteActions.failure(e))
  }
}

export function* watcher() {
  yield takeLatest(ServicesGetTypes.REQUEST, handleGet)
  yield takeLatest(ServicesCreateTypes.REQUEST, handleCreate)
  yield takeLatest(ServicesUpdateTypes.REQUEST, handleUpdate)
  yield takeLatest(ServicesDeleteTypes.REQUEST, handleDelete)
}
