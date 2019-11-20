import { action, payload } from "ts-action"
import { ProfileModel, PointModel } from "@ciclismurban/models"

import * as Types from "./user.types"
import { IState } from "./user.reducer"

export type TState = Required<IState>

export const Get = {
  request: action(Types.Get.REQUEST),
  success: action(Types.Get.SUCCESS, payload<TState["data"]>()),
  failure: action(Types.Get.FAILURE),
}

export const UpdateProfile = {
  request: action(Types.UpdateProfile.REQUEST, payload<Partial<ProfileModel>>()),
  success: action(Types.UpdateProfile.SUCCESS, payload<TState["data"]>()),
  failure: action(Types.UpdateProfile.FAILURE),
}

export const UpdatePosition = {
  request: action(Types.UpdatePosition.REQUEST, payload<PointModel>()),
  success: action(Types.UpdatePosition.SUCCESS, payload<TState["data"]>()),
  failure: action(Types.UpdatePosition.FAILURE),
}
