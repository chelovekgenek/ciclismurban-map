import React, { useEffect } from "react"
import { connect } from "react-redux"

import { Layout } from "components/generic"
import { ParkingsActions, ServicesActions, ShopsActions, EventsActions } from "store/entities/locations"

import Content from "./Content"
import Legend from "./Legend"

interface IDispatchProps {
  getEvents: typeof EventsActions.requestGet
  getParkings: typeof ParkingsActions.requestGet
  getServices: typeof ServicesActions.requestGet
  getShops: typeof ShopsActions.requestGet
}

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

export default connect<null, IDispatchProps, null, null>(
  null,
  {
    getEvents: EventsActions.requestGet,
    getParkings: ParkingsActions.requestGet,
    getServices: ServicesActions.requestGet,
    getShops: ShopsActions.requestGet,
  },
)(Map)
