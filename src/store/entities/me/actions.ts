import { action, payload } from "ts-action"
import { ProfileModel } from "@ciclismurban/models"

import { MeGetTypes, MeUpdateProfileTypes } from "./types"
import { IState } from "./reducer"

export type TState = Required<IState>

export const MeGetActions = {
  request: action(MeGetTypes.REQUEST),
  success: action(MeGetTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(MeGetTypes.FAILURE),
}

export const MeUpdateProfileActions = {
  request: action(MeUpdateProfileTypes.REQUEST, payload<Partial<ProfileModel>>()),
  success: action(MeUpdateProfileTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(MeUpdateProfileTypes.FAILURE),
}
