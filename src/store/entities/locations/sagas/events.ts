import { takeLatest, put, call } from "redux-saga/effects"
import { AxiosResponse } from "axios"

import { EventModel } from "models/location"

import { EventsTypes, EventsActions } from "../actions"
import { createEvent } from "../api"

function* handleCreate({ payload: { image, ...payload } }: ReturnType<typeof EventsActions.requestCreate>) {
  try {
    const { data }: AxiosResponse<EventModel> = yield call(createEvent, payload)
    yield put(EventsActions.successCreate(data))
  } catch (e) {
    yield put(EventsActions.failureCreate(e))
  }
}

export function* watcher() {
  yield takeLatest(EventsTypes.CREATE__REQUEST, handleCreate)
}
