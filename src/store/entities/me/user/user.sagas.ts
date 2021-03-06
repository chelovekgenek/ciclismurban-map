import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { UserModel } from "@ciclismurban/models"
import { extend } from "lodash-es"

import { uploadFile } from "store/commons"

import * as Types from "./user.types"
import * as Actions from "./user.actions"
import * as Facades from "./user.facades"

export function* handleGet() {
  try {
    const { data }: AxiosResponse<UserModel> = yield call(Facades.get)
    yield put(Actions.Get.success(data))
  } catch (e) {
    yield put(Actions.Get.failure())
  }
}

export function* handleUpdateProfile({ payload }: ReturnType<typeof Actions.UpdateProfile.request>) {
  try {
    const reqPayload = extend(payload, {
      avatar: yield call(uploadFile, payload.avatar),
    })
    const { data }: AxiosResponse<UserModel> = yield call(Facades.updateProfile, reqPayload)
    yield put(Actions.UpdateProfile.success(data))
  } catch (e) {
    yield put(Actions.UpdateProfile.failure())
  }
}

export function* handleUpdatePosition({ payload }: ReturnType<typeof Actions.UpdatePosition.request>) {
  try {
    const { data }: AxiosResponse<UserModel> = yield call(Facades.updatePosition, payload)
    yield put(Actions.UpdatePosition.success(data))
  } catch (e) {
    yield put(Actions.UpdatePosition.failure())
  }
}

export default function* watcher() {
  yield takeLatest(Types.Get.REQUEST, handleGet)
  yield takeLatest(Types.UpdateProfile.REQUEST, handleUpdateProfile)
  yield takeLatest(Types.UpdatePosition.REQUEST, handleUpdatePosition)
}
