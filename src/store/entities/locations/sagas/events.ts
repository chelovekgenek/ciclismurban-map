import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { extend } from "lodash-es"

import { history } from "store/history"
import { EventModel } from "models/location"

import {
  EventsGetTypes,
  EventsCreateTypes,
  EventsDeleteTypes,
  EventsGetActions,
  EventsCreateActions,
  EventsDeleteActions,
  EventsUpdateActions,
  EventsUpdateTypes,
  SelectedActions,
} from "../actions"
import { createEvent, uploadFile, getEvents, deleteEvent, updateEvent } from "../api"

function* handleGet() {
  try {
    const { data }: AxiosResponse<EventModel[]> = yield call(getEvents)
    yield put(EventsGetActions.success(data))
  } catch (e) {
    yield put(EventsGetActions.failure(e))
  }
}

function* handleCreate({ payload: { image, ...payload } }: ReturnType<typeof EventsCreateActions.request>) {
  try {
    const { data: link }: AxiosResponse<string> = yield call(uploadFile, image!)
    const { data }: AxiosResponse<EventModel> = yield call(createEvent, { ...payload, image: link })
    yield put(EventsCreateActions.success(data))
    yield call(history.replace, { pathname: "/events" })
  } catch (e) {
    yield put(EventsCreateActions.failure(e))
  }
}

function* handleUpdate({ payload: { uuid, payload } }: ReturnType<typeof EventsUpdateActions.request>) {
  try {
    const reqPayload = extend(payload, {
      image: payload.image ? (yield call(uploadFile, payload.image)).data : undefined,
    })
    const { data }: AxiosResponse<EventModel> = yield call(updateEvent, uuid, reqPayload)
    yield put(EventsUpdateActions.success(data))
    yield put(SelectedActions.set(data))
  } catch (e) {
    yield put(EventsUpdateActions.failure(e))
  }
}

function* handleDelete({ payload }: ReturnType<typeof EventsDeleteActions.request>) {
  try {
    const { data }: AxiosResponse<string> = yield call(deleteEvent, payload)
    yield put(EventsDeleteActions.success(data))
  } catch (e) {
    yield put(EventsDeleteActions.failure(e))
  }
}

export function* watcher() {
  yield takeLatest(EventsGetTypes.REQUEST, handleGet)
  yield takeLatest(EventsCreateTypes.REQUEST, handleCreate)
  yield takeLatest(EventsUpdateTypes.REQUEST, handleUpdate)
  yield takeLatest(EventsDeleteTypes.REQUEST, handleDelete)
}
