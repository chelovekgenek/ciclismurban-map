import React from "react"

import { Locations } from "components/generic/page"

import { IStateProps, IDispatchProps } from "./Events.container"

interface IProps extends IStateProps, IDispatchProps {}

export const Events: React.FC<IProps> = ({ events, fetching, getEvents, deleteEvent }) => (
  <Locations
    title="События"
    fetching={fetching}
    locations={events}
    links={{ create: "/event", getInfo: uuid => `/event/${uuid}` }}
    getLocations={getEvents}
    deleteLocation={deleteEvent}
  />
)
