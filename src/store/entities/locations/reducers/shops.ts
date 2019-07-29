import { reducer } from "ts-action"

import shops from "mocks/shops.json"

export interface IState {
  data: ILocation[]
  fetching: boolean
}

const initialState: IState = {
  data: shops,
  fetching: false,
}

export default reducer(initialState)
