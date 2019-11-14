import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { UserModel } from "@ciclismurban/models"

import { MeGetActions, MeUpdateProfileActions } from "./actions"
import { MeGetTypes, MeUpdateProfileTypes } from "./types"
import { getMe, updateMeProfile } from "./api"
import { uploadFile } from "../../commons"
import { extend } from "lodash-es"

export function* handleGet() {
  try {
    const { data }: AxiosResponse<UserModel> = yield call(getMe)
    yield put(MeGetActions.success(data))
  } catch (e) {
    yield put(MeGetActions.failure())
  }
}

export function* handleUpdateProfile({ payload }: ReturnType<typeof MeUpdateProfileActions.request>) {
  try {
    const reqPayload = extend(payload, {
      avatar: yield call(uploadFile, payload.avatar),
    })
    const { data }: AxiosResponse<UserModel> = yield call(updateMeProfile, reqPayload)
    yield put(MeUpdateProfileActions.success(data))
  } catch (e) {
    yield put(MeUpdateProfileActions.failure())
  }
}

export default function* watcher() {
  yield takeLatest(MeGetTypes.REQUEST, handleGet)
  yield takeLatest(MeUpdateProfileTypes.REQUEST, handleUpdateProfile)
}
