import { payload, action } from "ts-action"

import { IState as IEventsState } from "../reducers/events"
import { LocationModel } from "models/location"

export enum EventsTypes {
  GET__REQUEST = "LOCATIONS__EVENTS__GET__REQUEST",
  GET__SUCCESS = "LOCATIONS__EVENTS__GET__SUCCESS",
  GET__FAILURE = "LOCATIONS__EVENTS__GET__FAILURE",
  CREATE__REQUEST = "LOCATIONS__EVENTS__CREATE__REQUEST",
  CREATE__SUCCESS = "LOCATIONS__EVENTS__CREATE__SUCCESS",
  CREATE__FAILURE = "LOCATIONS__EVENTS__CREATE__FAILURE",
}

type TRequiredEventsState = Required<IEventsState>

export const EventsActions = {
  requestGet: action(EventsTypes.GET__REQUEST),
  successGet: action(EventsTypes.GET__SUCCESS, payload<TRequiredEventsState["data"]>()),
  failureGet: action(EventsTypes.GET__FAILURE, payload<TRequiredEventsState["error"]>()),

  requestCreate: action(EventsTypes.GET__REQUEST, payload<LocationModel>()),
  successCreate: action(EventsTypes.GET__SUCCESS, payload<TRequiredEventsState["data"][number]>()),
  failureCreate: action(EventsTypes.GET__FAILURE, payload<TRequiredEventsState["error"]>()),
}
