import React from "react"

import { Locations } from "components/generic/page"

import { IStateProps, IDispatchProps } from "./Shops.container"

interface IProps extends IStateProps, IDispatchProps {}

export const Shops: React.FC<IProps> = ({ shops, fetching, getShops, deleteShop }) => (
  <Locations
    title="Магазины"
    fetching={fetching}
    locations={shops}
    links={{ create: "/shop", getInfo: uuid => `/shop/${uuid}` }}
    getLocations={getShops}
    deleteLocation={deleteShop}
  />
)
