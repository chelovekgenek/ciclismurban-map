import React from "react"

import { Layout } from "components/generic/ui"
import { GoogleMap } from "components/generic/GoogleMap"

import * as Styled from "./Content.styled"
import { connect } from "react-redux"
import { TAppState } from "store/entities"
import { getRoot } from "store/entities/filters"

import parkings from "mocks/parkings.json"
import services from "mocks/services.json"
import shops from "mocks/shops.json"

interface IStateProps {
  filters: ReturnType<typeof getRoot>
}

interface IProps extends IStateProps {}

export const Content: React.FC<IProps> = ({ filters }) => (
  <Layout>
    <Layout.Content>
      <GoogleMap
        containerElement={<Styled.MapContainer />}
        mapElement={<Styled.Map />}
        defaultZoom={14}
        center={{ lat: 47.0203966, lng: 28.829422 }}
      >
        {filters.parkings && parkings.map(point => <GoogleMap.Marker position={point} />)}
        {filters.services && services.map(point => <GoogleMap.Marker position={point} />)}
        {filters.shops && shops.map(point => <GoogleMap.Marker position={point} />)}
      </GoogleMap>
    </Layout.Content>
  </Layout>
)

export default connect<IStateProps, null, null, TAppState>(state => ({
  filters: getRoot(state),
}))(Content)
