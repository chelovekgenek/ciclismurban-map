import { connect } from "react-redux"
import { Selectors as EventsSelectors } from "store/entities/locations/events"
import { Actions as EventsActions } from "store/entities/locations/events"
import { TAppState } from "store/entities"

import { Events } from "./Events"

export interface IStateProps {
  events: ReturnType<typeof EventsSelectors.getLocations>
  fetching: ReturnType<typeof EventsSelectors.getFetching>
}
export interface IDispatchProps {
  getEvents: typeof EventsActions.Get.request
  deleteEvent: typeof EventsActions.Delete.request
}

export const EventsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: EventsSelectors.getLocations(state),
    fetching: EventsSelectors.getFetching(state),
  }),
  {
    getEvents: EventsActions.Get.request,
    deleteEvent: EventsActions.Delete.request,
  },
)(Events)
