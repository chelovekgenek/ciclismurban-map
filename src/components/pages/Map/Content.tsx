import React, { useMemo, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { clamp, truncate } from "lodash-es"

import { GoogleMap } from "components/generic/ui"
import { getFilteredLocations, getFilteredLocationsCount, getCurrentData } from "store/entities/locations"
import { TAppState } from "store/entities"
import { LocationModel } from "models/location"
import { MapOptions } from "helpers"

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

  const renderMarkers = useCallback(
    (dataset: Array<LocationModel>, entity: string, icon?: string) =>
      dataset.map(({ uuid, point, title, image, description }) => {
        const key = clamp(point.lat, point.lng)
        return (
          <GoogleMap.Marker
            useInFitBounds
            key={key}
            position={point}
            onClick={() => setInfoKey(key === infoKey ? null : key)}
            icon={icon ? { url: icon } : undefined}
          >
            {infoKey === key && entity && (
              <GoogleMap.InfoWindow onCloseClick={() => setInfoKey(null)}>
                <Styled.MarkerInfoContainer>
                  <Link to={`/locations/${entity}/${uuid}`}>{title}</Link>
                  <p>{truncate(description, { length: 100 })}</p>
                  <img src={image} alt={title} />
                </Styled.MarkerInfoContainer>
              </GoogleMap.InfoWindow>
            )}
          </GoogleMap.Marker>
        )
      }),
    [infoKey],
  )

  const eventsMarkers = useMemo(() => renderMarkers(locations.events, "events", ParkingIcon), [
    renderMarkers,
    locations.events,
  ])
  const parkingsMarkers = useMemo(() => renderMarkers(locations.parkings, "parkings", ParkingIcon), [
    renderMarkers,
    locations.parkings,
  ])
  const servicesMarkers = useMemo(() => renderMarkers(locations.services, "services", ServiceIcon), [
    renderMarkers,
    locations.services,
  ])
  const shopsMarkers = useMemo(() => renderMarkers(locations.shops, "shops", ShopIcon), [
    renderMarkers,
    locations.shops,
  ])
  const additionalMapProps = useMemo(() => (locationsCount ? {} : MapOptions), [locationsCount])

  return (
    <GoogleMap
      defaultCenter={MapOptions.position}
      defaultZoom={MapOptions.zoom}
      options={{ disableDefaultUI: true }}
      {...additionalMapProps}
    >
      {eventsMarkers}
      {parkingsMarkers}
      {servicesMarkers}
      {shopsMarkers}
      {current && <GoogleMap.Marker position={current} />}
    </GoogleMap>
  )
}

export default connect<IStateProps, null, null, TAppState>(state => ({
  current: getCurrentData(state),
  locations: getFilteredLocations(state),
  locationsCount: getFilteredLocationsCount(state),
}))(Content)
