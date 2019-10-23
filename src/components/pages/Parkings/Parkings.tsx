import React from "react"

import { Locations } from "components/generic/page"

import { IStateProps, IDispatchProps } from "./Parkings.container"

interface IProps extends IStateProps, IDispatchProps {}

export const Parkings: React.FC<IProps> = ({ parkings, fetching, getParkings, deleteParking }) => (
  <Locations
    title="Парковки"
    fetching={fetching}
    locations={parkings}
    links={{ create: "/parking", getInfo: uuid => `/parking/${uuid}` }}
    getLocations={getParkings}
    deleteLocation={deleteParking}
  />
)
