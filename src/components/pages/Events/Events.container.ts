import { connect } from "react-redux"
import { getEventsLocations, getEventsFetching } from "store/entities/locations"
import { Actions as EventsActions } from "store/entities/locations/events"
import { TAppState } from "store/entities"

import { Events } from "./Events"

export interface IStateProps {
  events: ReturnType<typeof getEventsLocations>
  fetching: ReturnType<typeof getEventsFetching>
}
export interface IDispatchProps {
  getEvents: typeof EventsActions.Get.request
  deleteEvent: typeof EventsActions.Delete.request
}

export const EventsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: getEventsLocations(state),
    fetching: getEventsFetching(state),
  }),
  {
    getEvents: EventsActions.Get.request,
    deleteEvent: EventsActions.Delete.request,
  },
)(Events)
