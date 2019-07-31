import React, { useMemo, useState, useCallback } from "react"
import { connect } from "react-redux"
import { clamp } from "lodash-es"

import { GoogleMap } from "components/generic/ui"
import { getFilteredLocations, getFilteredLocationsCount, getCurrentData } from "store/entities/locations"
import { TAppState } from "store/entities"

import ParkingIcon from "assets/parking.png"
import ServiceIcon from "assets/service.png"
import ShopIcon from "assets/shop.png"

import * as Styled from "./Content.styled"

interface IStateProps {
  locations: ReturnType<typeof getFilteredLocations>
  locationsCount: ReturnType<typeof getFilteredLocationsCount>
  current: ReturnType<typeof getCurrentData>
}

interface IProps extends IStateProps {}

export const Content: React.FC<IProps> = ({ locations, locationsCount, current }) => {
  const [infoKey, setInfoKey] = useState<null | number>(null)
  const renderMarker = useCallback(
    (dataset: ILocation[], icon?: string) =>
      dataset.map(({ point, title, image }) => {
        const key = clamp(point.lat, point.lng)
        return (
          <GoogleMap.Marker
            key={key}
            position={point}
            onClick={() => setInfoKey(key === infoKey ? null : key)}
            icon={icon ? { url: icon } : undefined}
          >
            {infoKey === key && title && (
              <GoogleMap.InfoWindow onCloseClick={() => setInfoKey(null)}>
                <Styled.MarkerInfoContainer>
                  <p>{title}</p>
                  {image && <img src={image} alt={title} />}
                </Styled.MarkerInfoContainer>
              </GoogleMap.InfoWindow>
            )}
          </GoogleMap.Marker>
        )
      }),
    [infoKey],
  )
  const parkingsMarkers = useMemo(() => renderMarker(locations.parkings, ParkingIcon), [
    renderMarker,
    locations.parkings,
  ])
  const servicesMarkers = useMemo(() => renderMarker(locations.services, ServiceIcon), [
    renderMarker,
    locations.services,
  ])
  const shopsMarkers = useMemo(() => renderMarker(locations.shops, ShopIcon), [renderMarker, locations.shops])
  const currentMarker = useMemo(() => current && renderMarker([{ point: current }]), [renderMarker, current])
  const additionalMapProps = useMemo(
    () => (locationsCount ? {} : { zoom: 14, center: { lat: 47.0203966, lng: 28.829422 } }),
    [locationsCount],
  )
  return (
    <GoogleMap
      options={{ disableDefaultUI: true }}
      containerElement={<Styled.MapContainer />}
      mapElement={<Styled.Map />}
      {...additionalMapProps}
    >
      {parkingsMarkers}
      {servicesMarkers}
      {shopsMarkers}
      {currentMarker}
    </GoogleMap>
  )
}

export default connect<IStateProps, null, null, TAppState>(state => ({
  current: getCurrentData(state),
  locations: getFilteredLocations(state),
  locationsCount: getFilteredLocationsCount(state),
}))(Content)
