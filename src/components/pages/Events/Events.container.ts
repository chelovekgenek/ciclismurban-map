import { connect } from "react-redux"
import { Selectors, Actions } from "store/entities/locations/events"
import { TAppState } from "store/entities"

import { Events } from "./Events"

export interface IStateProps {
  events: ReturnType<typeof Selectors.getLocations>
  fetching: ReturnType<typeof Selectors.getFetching>
}
export interface IDispatchProps {
  getEvents: typeof Actions.Get.request
  deleteEvent: typeof Actions.Delete.request
}

export const EventsContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    events: Selectors.getLocations(state),
    fetching: Selectors.getFetching(state),
  }),
  {
    getEvents: Actions.Get.request,
    deleteEvent: Actions.Delete.request,
  },
)(Events)
