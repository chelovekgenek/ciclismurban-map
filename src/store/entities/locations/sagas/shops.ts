import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { extend } from "lodash-es"
import { ShopModel } from "@ciclismurban/models"

import { history } from "store/history"

import { getShops, deleteShop, updateShop, uploadFile, createShop } from "../api"
import {
  ShopsGetActions,
  ShopsGetTypes,
  ShopsCreateTypes,
  ShopsUpdateTypes,
  ShopsDeleteTypes,
  ShopsCreateActions,
  ShopsUpdateActions,
  ShopsDeleteActions,
  SelectedActions,
} from "../actions"

function* handleGet() {
  try {
    const { data }: AxiosResponse<ShopModel[]> = yield call(getShops)
    yield put(ShopsGetActions.success(data))
  } catch (e) {
    yield put(ShopsGetActions.failure(e))
  }
}

type THandleCreateAction = ReturnType<typeof ShopsCreateActions.request>
function* handleCreate({ payload: { image, ...payload } }: THandleCreateAction) {
  try {
    const { data: link }: AxiosResponse<string> = yield call(uploadFile, image!)
    const { data }: AxiosResponse<ShopModel> = yield call(createShop, { ...payload, image: link })
    yield put(ShopsCreateActions.success(data))
    yield call(history.replace, { pathname: "/shops" })
  } catch (e) {
    yield put(ShopsCreateActions.failure(e))
  }
}

type THandleUpdateAction = ReturnType<typeof ShopsUpdateActions.request>
function* handleUpdate({ payload: { uuid, payload } }: THandleUpdateAction) {
  try {
    const reqPayload = extend(payload, {
      image: payload.image ? (yield call(uploadFile, payload.image)).data : undefined,
    })
    const { data }: AxiosResponse<ShopModel> = yield call(updateShop, uuid, reqPayload)
    yield put(ShopsUpdateActions.success(data))
    yield put(SelectedActions.set(data))
  } catch (e) {
    yield put(ShopsUpdateActions.failure(e))
  }
}

type THandleDeleteAction = ReturnType<typeof ShopsDeleteActions.request>
function* handleDelete({ payload }: THandleDeleteAction) {
  try {
    const { data }: AxiosResponse<string> = yield call(deleteShop, payload)
    yield put(ShopsDeleteActions.success(data))
  } catch (e) {
    yield put(ShopsDeleteActions.failure(e))
  }
}

export function* watcher() {
  yield takeLatest(ShopsGetTypes.REQUEST, handleGet)
  yield takeLatest(ShopsCreateTypes.REQUEST, handleCreate)
  yield takeLatest(ShopsUpdateTypes.REQUEST, handleUpdate)
  yield takeLatest(ShopsDeleteTypes.REQUEST, handleDelete)
}
