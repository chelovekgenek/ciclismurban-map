import { payload, action } from "ts-action"

import { IState as IEventsState } from "../reducers/events"

export enum EventsGetTypes {
  REQUEST = "LOCATIONS__EVENTS__GET__REQUEST",
  SUCCESS = "LOCATIONS__EVENTS__GET__SUCCESS",
  FAILURE = "LOCATIONS__EVENTS__GET__FAILURE",
}

export enum EventsCreateTypes {
  REQUEST = "LOCATIONS__EVENTS__CREATE__REQUEST",
  SUCCESS = "LOCATIONS__EVENTS__CREATE__SUCCESS",
  FAILURE = "LOCATIONS__EVENTS__CREATE__FAILURE",
}

export enum EventsUpdateTypes {
  REQUEST = "LOCATIONS__EVENTS__UPDATE__REQUEST",
  SUCCESS = "LOCATIONS__EVENTS__UPDATE__SUCCESS",
  FAILURE = "LOCATIONS__EVENTS__UPDATE__FAILURE",
}

export enum EventsDeleteTypes {
  REQUEST = "LOCATIONS__EVENTS__DELETE__REQUEST",
  SUCCESS = "LOCATIONS__EVENTS__DELETE__SUCCESS",
  FAILURE = "LOCATIONS__EVENTS__DELETE__FAILURE",
}

type TState = Required<IEventsState>
type TStateData = TState["data"][number]

export const EventsGetActions = {
  request: action(EventsGetTypes.REQUEST),
  success: action(EventsGetTypes.SUCCESS, payload<TState["data"]>()),
  failure: action(EventsGetTypes.FAILURE, payload<TState["error"]>()),
}

export const EventsCreateActions = {
  request: action(EventsCreateTypes.REQUEST, payload<Partial<TStateData>>()),
  success: action(EventsCreateTypes.SUCCESS, payload<TStateData>()),
  failure: action(EventsCreateTypes.FAILURE, payload<TState["error"]>()),
}

interface TUpdatePayload {
  uuid: TStateData["uuid"]
  payload: Partial<TStateData>
}
export const EventsUpdateActions = {
  request: action(EventsUpdateTypes.REQUEST, payload<TUpdatePayload>()),
  success: action(EventsUpdateTypes.SUCCESS, payload<TStateData>()),
  failure: action(EventsUpdateTypes.FAILURE, payload<TState["error"]>()),
}

export const EventsDeleteActions = {
  request: action(EventsDeleteTypes.REQUEST, payload<TStateData["uuid"]>()),
  success: action(EventsDeleteTypes.SUCCESS, payload<TStateData["uuid"]>()),
  failure: action(EventsDeleteTypes.FAILURE, payload<TState["error"]>()),
}
