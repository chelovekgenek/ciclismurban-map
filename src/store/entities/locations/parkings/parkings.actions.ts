import { payload, action } from "ts-action"

import { IState as IParkingsState } from "./parkings.reducer"
import * as Types from "./parkings.types"

type TState = Required<IParkingsState>
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
