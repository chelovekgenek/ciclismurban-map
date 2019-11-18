import { takeLatest, select, put } from "redux-saga/effects"

import { Position } from "store/entities/me"

import { Types } from "./filters.types"
import { Actions } from "./filters.actions"
import { getRoot } from "./filters.selectors"

export function* handleToggle({ payload }: ReturnType<typeof Actions.toggle>) {
  const filters: ReturnType<typeof getRoot> = yield select(getRoot)
  if (payload === "current" && filters.current) {
    yield put(Position.Actions.Polling.start())
  }
  if (payload === "current" && !filters.current) {
    yield put(Position.Actions.Polling.stop())
  }
}

export default function* watcher() {
  yield takeLatest(Types.TOGGLE, handleToggle)
}
