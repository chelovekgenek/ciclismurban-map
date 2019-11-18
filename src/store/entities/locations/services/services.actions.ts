import { action, payload } from "ts-action"

import * as Types from "./services.types"
import { IState as IServicesState } from "./services.reducer"

type TState = Required<IServicesState>
type TStateData = TState["data"][number]

export const Get = {
  request: action(Types.Get.REQUEST),
  success: action(Types.Get.SUCCESS, payload<TState["data"]>()),
  failure: action(Types.Get.FAILURE),
}

export const Create = {
  request: action(Types.Create.REQUEST, payload<Partial<TStateData>>()),
  success: action(Types.Create.SUCCESS, payload<TStateData>()),
  failure: action(Types.Create.FAILURE),
}

interface TUpdatePayload {
  uuid: TStateData["uuid"]
  payload: Partial<TStateData>
}
export const Update = {
  request: action(Types.Update.REQUEST, payload<TUpdatePayload>()),
  success: action(Types.Update.SUCCESS, payload<TStateData>()),
  failure: action(Types.Update.FAILURE),
}

export const Delete = {
  request: action(Types.Delete.REQUEST, payload<TStateData["uuid"]>()),
  success: action(Types.Delete.SUCCESS, payload<TStateData["uuid"]>()),
  failure: action(Types.Delete.FAILURE),
}
