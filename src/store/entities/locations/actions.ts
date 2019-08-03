import { action, payload } from "ts-action"

import { IState as IFiltersState } from "./reducers/filters"
import { IState as ICurrentState } from "./reducers/current"
import { IState as IParkingsState } from "./reducers/parkings"
import { IState as IServicesState } from "./reducers/services"
import { IState as IShopsState } from "./reducers/shops"
import { IState as ISelectedState } from "./reducers/selected"

import { FiltersTypes, CurrentTypes, ParkingsTypes, ServicesTypes, ShopsTypes, SelectedTypes } from "./types"

export const FiltersActions = {
  toggle: action(FiltersTypes.TOGGLE, payload<keyof IFiltersState>()),
  reset: action(FiltersTypes.RESET),
}

type TRequiredCurrentState = Required<ICurrentState>
export const CurrentActions = {
  pollingStart: action(CurrentTypes.POLLING__START),
  pollingStop: action(CurrentTypes.POLLING__STOP),
  requestGet: action(CurrentTypes.GET__REQUEST),
  successGet: action(CurrentTypes.GET__SUCCESS, payload<TRequiredCurrentState["data"]>()),
  failureGet: action(CurrentTypes.GET__FAILURE, payload<TRequiredCurrentState["error"]>()),
}

type TRequiredParkingsState = Required<IParkingsState>
export const ParkingsActions = {
  requestGet: action(ParkingsTypes.GET__REQUEST),
  successGet: action(ParkingsTypes.GET__SUCCESS, payload<TRequiredParkingsState["data"]>()),
  failureGet: action(ParkingsTypes.GET__FAILURE, payload<TRequiredParkingsState["error"]>()),
}

type TRequiredServicesState = Required<IServicesState>
export const ServicesActions = {
  requestGet: action(ServicesTypes.GET__REQUEST),
  successGet: action(ServicesTypes.GET__SUCCESS, payload<TRequiredServicesState["data"]>()),
  failureGet: action(ServicesTypes.GET__FAILURE, payload<TRequiredServicesState["error"]>()),
}

type TRequiredShopsState = Required<IShopsState>
export const ShopsActions = {
  requestGet: action(ShopsTypes.GET__REQUEST),
  successGet: action(ShopsTypes.GET__SUCCESS, payload<TRequiredShopsState["data"]>()),
  failureGet: action(ShopsTypes.GET__FAILURE, payload<TRequiredShopsState["error"]>()),
}

type TRequiredSelectedState = Required<ISelectedState>
type TRequestGetSelectedPayload = {
  entity: TRequiredSelectedState["entity"]
  uuid: TRequiredSelectedState["data"]["uuid"]
}
export const SelectedActions = {
  requestGet: action(SelectedTypes.GET__REQUEST, payload<TRequestGetSelectedPayload>()),
  successGet: action(SelectedTypes.GET__SUCCESS, payload<TRequiredSelectedState["data"]>()),
  failureGet: action(SelectedTypes.GET__FAILURE, payload<TRequiredSelectedState["error"]>()),
  clear: action(SelectedTypes.CLEAR),
}
