import React, { useMemo } from "react"
import { connect } from "react-redux"
import { union, clamp } from "lodash-es"

import { Layout } from "components/generic/ui"
import { GoogleMap } from "components/generic/GoogleMap"

import { TAppState } from "store/entities"
import { getRoot } from "store/entities/filters"

import parkings from "mocks/parkings.json"
import services from "mocks/services.json"
import shops from "mocks/shops.json"

import * as Styled from "./Content.styled"

interface IStateProps {
  filters: ReturnType<typeof getRoot>
}

interface IProps extends IStateProps {}

export const Content: React.FC<IProps> = ({ filters }) => {
  const markers = useMemo(
    () =>
      union(filters.parkings ? parkings : [], filters.services ? services : [], filters.shops ? shops : []).map(
        ({ lat, lng }) => <GoogleMap.Marker key={clamp(lat, lng)} position={{ lat, lng }} />,
      ),
    [filters],
  )
  const additionalMapProps = useMemo(() => {
    return Object.values(filters).includes(true) ? {} : { zoom: 14, center: { lat: 47.0203966, lng: 28.829422 } }
  }, [filters])
  return (
    <Layout>
      <Layout.Content>
        <GoogleMap containerElement={<Styled.MapContainer />} mapElement={<Styled.Map />} {...additionalMapProps}>
          {markers}
        </GoogleMap>
      </Layout.Content>
    </Layout>
  )
}

export default connect<IStateProps, null, null, TAppState>(state => ({
  filters: getRoot(state),
}))(Content)
