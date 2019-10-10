import { connect } from "react-redux"
import { getEventsLocations, EventsActions, getEventsFetching } from "store/entities/locations"
import { TAppState } from "store/entities"

import { Events } from "./Events"

export interface IStateProps {
  events: ReturnType<typeof getEventsLocations>
  fetching: ReturnType<typeof getEventsFetching>
}
export interface IDispatchProps {
  getEvents: typeof EventsActions.requestGet
  deleteEvent: typeof EventsActions.requestDelete
}

export const EventsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: getEventsLocations(state),
    fetching: getEventsFetching(state),
  }),
  {
    getEvents: EventsActions.requestGet,
    deleteEvent: EventsActions.requestDelete,
  },
)(Events)
