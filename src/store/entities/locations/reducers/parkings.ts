import { reducer } from "ts-action"

import parkings from "mocks/parkings.json"

export interface IState {
  data: ILocation[]
  fetching: boolean
}

const initialState: IState = {
  data: parkings,
  fetching: false,
}

export default reducer(initialState)
