import { payload, action } from "ts-action"

import { IState as IEventsState } from "../reducers/events"

export enum EventsTypes {
  GET__REQUEST = "LOCATIONS__EVENTS__GET__REQUEST",
  GET__SUCCESS = "LOCATIONS__EVENTS__GET__SUCCESS",
  GET__FAILURE = "LOCATIONS__EVENTS__GET__FAILURE",
  CREATE__REQUEST = "LOCATIONS__EVENTS__CREATE__REQUEST",
  CREATE__SUCCESS = "LOCATIONS__EVENTS__CREATE__SUCCESS",
  CREATE__FAILURE = "LOCATIONS__EVENTS__CREATE__FAILURE",
  DELETE__REQUEST = "LOCATIONS__EVENTS__DELETE__REQUEST",
  DELETE__SUCCESS = "LOCATIONS__EVENTS__DELETE__SUCCESS",
  DELETE__FAILURE = "LOCATIONS__EVENTS__DELETE__FAILURE",
}

type TRequiredEventsState = Required<IEventsState>

export const EventsActions = {
  requestGet: action(EventsTypes.GET__REQUEST),
  successGet: action(EventsTypes.GET__SUCCESS, payload<TRequiredEventsState["data"]>()),
  failureGet: action(EventsTypes.GET__FAILURE, payload<TRequiredEventsState["error"]>()),

  requestCreate: action(EventsTypes.CREATE__REQUEST, payload<Partial<TRequiredEventsState["data"][number]>>()),
  successCreate: action(EventsTypes.CREATE__SUCCESS, payload<TRequiredEventsState["data"][number]>()),
  failureCreate: action(EventsTypes.CREATE__FAILURE, payload<TRequiredEventsState["error"]>()),

  requestDelete: action(EventsTypes.DELETE__REQUEST, payload<TRequiredEventsState["data"][number]["uuid"]>()),
  successDelete: action(EventsTypes.DELETE__SUCCESS, payload<TRequiredEventsState["data"][number]["uuid"]>()),
  failureDelete: action(EventsTypes.DELETE__FAILURE, payload<TRequiredEventsState["error"]>()),
}
