import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { EventModel } from "models/location"

import { EventsTypes, EventsActions } from "../actions"
import { createEvent, uploadFile, getEvents } from "../api"

function* handleGet() {
  try {
    const { data }: AxiosResponse<EventModel[]> = yield call(getEvents)
    yield put(EventsActions.successGet(data))
  } catch (e) {
    yield put(EventsActions.failureGet(e))
  }
}

function* handleCreate({ payload: { image, ...payload } }: ReturnType<typeof EventsActions.requestCreate>) {
  try {
    const { data: link }: AxiosResponse<string> = yield call(uploadFile, image!)
    const { data }: AxiosResponse<EventModel> = yield call(createEvent, { ...payload, image: link })
    yield put(EventsActions.successCreate(data))
  } catch (e) {
    yield put(EventsActions.failureCreate(e))
  }
}

export function* watcher() {
  yield takeLatest(EventsTypes.GET__REQUEST, handleGet)
  yield takeLatest(EventsTypes.CREATE__REQUEST, handleCreate)
}
