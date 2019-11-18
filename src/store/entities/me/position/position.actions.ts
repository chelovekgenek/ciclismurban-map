import { action, payload } from "ts-action"

import { IState } from "./position.reducer"
import * as Types from "./position.types"

type TState = Required<IState>
export const Polling = {
  start: action(Types.Polling.START),
  stop: action(Types.Polling.STOP),
}
export const Get = {
  request: action(Types.Get.REQUEST),
  success: action(Types.Get.SUCCESS, payload<TState["data"]>()),
  failure: action(Types.Get.FAILURE),
}
