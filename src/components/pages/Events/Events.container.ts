import { connect } from "react-redux"
import { getEventsLocations, EventsGetActions, getEventsFetching, EventsDeleteActions } from "store/entities/locations"
import { TAppState } from "store/entities"

import { Events } from "./Events"

export interface IStateProps {
  events: ReturnType<typeof getEventsLocations>
  fetching: ReturnType<typeof getEventsFetching>
}
export interface IDispatchProps {
  getEvents: typeof EventsGetActions.request
  deleteEvent: typeof EventsDeleteActions.request
}

export const EventsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: getEventsLocations(state),
    fetching: getEventsFetching(state),
  }),
  {
    getEvents: EventsGetActions.request,
    deleteEvent: EventsDeleteActions.request,
  },
)(Events)
