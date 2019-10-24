import React from "react"

import { Locations } from "components/generic/page"

import { IStateProps, IDispatchProps } from "./Services.container"

interface IProps extends IStateProps, IDispatchProps {}

export const Services: React.FC<IProps> = ({ services, fetching, getServices, deleteService }) => (
  <Locations
    title="Сервисы"
    fetching={fetching}
    locations={services}
    links={{ create: "/service", getInfo: uuid => `/service/${uuid}` }}
    getLocations={getServices}
    deleteLocation={deleteService}
  />
)
