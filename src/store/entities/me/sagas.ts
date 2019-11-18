import { all, fork } from "redux-saga/effects"

import user from "./user/user.sagas"

export default function* AppSagas() {
  yield all([fork(user)])
}
