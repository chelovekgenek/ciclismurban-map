import React, { useMemo, useState, useCallback } from "react"
import { connect } from "react-redux"
import { clamp } from "lodash-es"

import { Layout } from "components/generic/ui"
import { GoogleMap } from "components/generic/GoogleMap"
import { getFilteredLocations, getFilteredLocationsCount } from "store/entities/locations"
import { TAppState } from "store/entities"

import ParkingIcon from "assets/parking.png"
import ServiceIcon from "assets/service.png"
import ShopIcon from "assets/shop.png"

import * as Styled from "./Content.styled"

interface IStateProps {
  locations: ReturnType<typeof getFilteredLocations>
  locationsCount: ReturnType<typeof getFilteredLocationsCount>
}

interface IProps extends IStateProps {}

export const Content: React.FC<IProps> = ({ locations, locationsCount }) => {
  const [infoKey, setInfoKey] = useState<null | number>(null)
  const renderMarker = useCallback(
    (dataset: ILocation[], icon: string) =>
      dataset.map(({ point, title, image }) => {
        const key = clamp(point.lat, point.lng)
        return (
          <GoogleMap.Marker
            key={key}
            position={point}
            onClick={() => setInfoKey(key === infoKey ? null : key)}
            icon={{ url: icon }}
          >
            {infoKey === key && title && (
              <GoogleMap.InfoWindow onCloseClick={() => setInfoKey(null)}>
                <Styled.MarkerContent>
                  <p>{title}</p>
                  {image && <img src={image} alt={title} />}
                </Styled.MarkerContent>
              </GoogleMap.InfoWindow>
            )}
          </GoogleMap.Marker>
        )
      }),
    [infoKey],
  )
  const parkings = useMemo(() => renderMarker(locations.parkings, ParkingIcon), [renderMarker, locations.parkings])
  const services = useMemo(() => renderMarker(locations.services, ServiceIcon), [renderMarker, locations.services])
  const shops = useMemo(() => renderMarker(locations.shops, ShopIcon), [renderMarker, locations.shops])
  const additionalMapProps = useMemo(
    () => (locationsCount ? {} : { zoom: 14, center: { lat: 47.0203966, lng: 28.829422 } }),
    [locationsCount],
  )
  return (
    <Layout>
      <Layout.Content>
        <GoogleMap containerElement={<Styled.MapContainer />} mapElement={<Styled.Map />} {...additionalMapProps}>
          {parkings}
          {services}
          {shops}
        </GoogleMap>
      </Layout.Content>
    </Layout>
  )
}

export default connect<IStateProps, null, null, TAppState>(state => ({
  locations: getFilteredLocations(state),
  locationsCount: getFilteredLocationsCount(state),
}))(Content)
