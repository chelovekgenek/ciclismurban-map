import { reducer } from "ts-action"

import services from "mocks/services.json"

export interface IState {
  data: ILocation[]
  fetching: boolean
}

const initialState: IState = {
  data: services,
  fetching: false,
}

export default reducer(initialState)
