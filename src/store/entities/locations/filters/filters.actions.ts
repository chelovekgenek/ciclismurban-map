import { action, payload } from "ts-action"

import { Types } from "./filters.types"
import { IState } from "./filters.reducer"

export const Actions = {
  toggle: action(Types.TOGGLE, payload<keyof IState>()),
  reset: action(Types.RESET),
}
