import React, { useEffect } from "react"

import { Layout } from "components/generic"

import { Content } from "./Content"
import { LegendContainer as Legend } from "./Legend.container"
import { IDispatchProps } from "./Map.container"

interface IProps extends IDispatchProps {}

export const Map: React.FC<IProps> = ({ getEvents, getParkings, getServices, getShops }) => {
  useEffect(() => {
    getEvents()
    getParkings()
    getServices()
    getShops()
  }, [getEvents, getParkings, getServices, getShops])
  return (
    <Layout.App>
      <Legend />
      <Content />
    </Layout.App>
  )
}
