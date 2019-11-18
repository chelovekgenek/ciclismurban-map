import { reducer, on } from "ts-action"
import { UserModel } from "@ciclismurban/models"

import * as Actions from "./user.actions"
import { LogoutAction } from "../../auth"

export interface IState {
  fetching: boolean
  data?: UserModel
  error?: number
}

export const initialState: IState = {
  fetching: false,
}

export default reducer(
  initialState,
  on(Actions.Get.request, Actions.UpdateProfile.request, state => ({
    ...initialState,
    data: state.data,
    fetching: true,
  })),
  on(Actions.Get.success, Actions.UpdateProfile.success, (state, { payload }) => ({
    ...initialState,
    data: payload,
  })),
  on(Actions.Get.failure, Actions.UpdateProfile.failure, state => ({
    ...state,
    fetching: false,
    error: undefined,
  })),
  on(LogoutAction, () => initialState),
)
