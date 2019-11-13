import { action, payload } from "ts-action"

import { MeGetTypes } from "./types"
import { IState } from "./reducer"

export type TState = Required<IState>

export const MeGetActions = {
  request: action(MeGetTypes.REQUEST),
  success: action(MeGetTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(MeGetTypes.FAILURE),
}
