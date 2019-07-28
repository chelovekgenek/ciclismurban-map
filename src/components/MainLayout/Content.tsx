import React, { useMemo } from "react"

import { Layout } from "components/generic/ui"
import { GoogleMap } from "components/generic/GoogleMap"

import * as Styled from "./Content.styled"
import { connect } from "react-redux"
import { TAppState } from "store/entities"
import { getRoot } from "store/entities/filters"

import parkings from "mocks/parkings.json"
import services from "mocks/services.json"
import shops from "mocks/shops.json"

const renderMarkers = <T extends {}>(type: string) => (point: T, i: number) => (
  <GoogleMap.Marker key={`${type}__${i}`} position={point} />
)

interface IStateProps {
  filters: ReturnType<typeof getRoot>
}

interface IProps extends IStateProps {}

export const Content: React.FC<IProps> = ({ filters }) => {
  const parkingsMarkers = useMemo(() => filters.parkings && parkings.map(renderMarkers("parkings")), [filters.parkings])
  const servicesMarkers = useMemo(() => filters.services && services.map(renderMarkers("services")), [filters.services])
  const shopsMarkers = useMemo(() => filters.shops && shops.map(renderMarkers("shops")), [filters.shops])
  return (
    <Layout>
      <Layout.Content>
        <GoogleMap
          containerElement={<Styled.MapContainer />}
          mapElement={<Styled.Map />}
          defaultZoom={14}
          center={{ lat: 47.0203966, lng: 28.829422 }}
        >
          {parkingsMarkers}
          {servicesMarkers}
          {shopsMarkers}
        </GoogleMap>
      </Layout.Content>
    </Layout>
  )
}

export default connect<IStateProps, null, null, TAppState>(state => ({
  filters: getRoot(state),
}))(Content)
