import React, { useEffect } from "react"
import { connect } from "react-redux"

import { MainLayout } from "components/generic"
import { requestGetParkings, requestGetServices, requestGetShops } from "store/entities/locations"

import Content from "./Content"
import Legend from "./Legend"

interface IDispatchProps {
  getParkings: typeof requestGetParkings
  getServices: typeof requestGetServices
  getShops: typeof requestGetShops
}

interface IProps extends IDispatchProps {}

export const Map: React.FC<IProps> = ({ getParkings, getServices, getShops }) => {
  useEffect(() => {
    getParkings()
    getServices()
    getShops()
  })
  return (
    <MainLayout>
      <Legend />
      <Content />
    </MainLayout>
  )
}

export default connect<null, IDispatchProps, null, null>(
  null,
  {
    getParkings: requestGetParkings,
    getServices: requestGetServices,
    getShops: requestGetShops,
  },
)(Map)
