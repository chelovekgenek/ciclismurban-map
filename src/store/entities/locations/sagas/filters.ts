import { takeLatest, select, put } from "redux-saga/effects"
import { FiltersActions, CurrentActions, FiltersTypes } from "../actions"
import { getFilters } from "../selectors"

function* handleToggle({ payload }: ReturnType<typeof FiltersActions.toggle>) {
  const filters: ReturnType<typeof getFilters> = yield select(getFilters)
  if (payload === "current" && filters.current) {
    yield put(CurrentActions.pollingStart())
  }
  if (payload === "current" && !filters.current) {
    yield put(CurrentActions.pollingStop())
  }
}

export function* watcher() {
  yield takeLatest(FiltersTypes.TOGGLE, handleToggle)
}
