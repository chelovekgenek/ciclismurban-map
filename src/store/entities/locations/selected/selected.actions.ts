import { action, payload } from "ts-action"

import * as Types from "./selected.types"
import { IState } from "./selected.reducer"

type TState = Required<IState>
type TRequestGetPayload = {
  entity: TState["entity"]
  uuid: TState["data"]["uuid"]
}
export const Get = {
  request: action(Types.Get.REQUEST, payload<TRequestGetPayload>()),
  success: action(Types.Get.SUCCESS, payload<TState["data"]>()),
  failure: action(Types.Get.FAILURE),
}

export const set = action(Types.SET, payload<TState["data"]>())
export const clear = action(Types.CLEAR)
