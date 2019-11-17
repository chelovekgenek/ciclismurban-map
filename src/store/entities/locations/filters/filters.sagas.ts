import { takeLatest, select, put } from "redux-saga/effects"

import { Types } from "./filters.types"
import { Actions } from "./filters.actions"
import { getRoot } from "./filters.selectors"
import { CurrentActions } from "../actions"

export function* handleToggle({ payload }: ReturnType<typeof Actions.toggle>) {
  const filters: ReturnType<typeof getRoot> = yield select(getRoot)
  if (payload === "current" && filters.current) {
    yield put(CurrentActions.pollingStart())
  }
  if (payload === "current" && !filters.current) {
    yield put(CurrentActions.pollingStop())
  }
}

export default function* watcher() {
  yield takeLatest(Types.TOGGLE, handleToggle)
}
