import React, { useMemo, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { truncate } from "lodash-es"

import { GoogleMap } from "components/generic/ui"
import { getFilteredLocations, getFilteredLocationsCount, getCurrentLocation } from "store/entities/locations"
import { LocationModel } from "models/location"
import { MapOptions } from "helpers"

import ParkingIcon from "assets/parking.png"
import ServiceIcon from "assets/service.png"
import ShopIcon from "assets/shop.png"

import * as Styled from "./Content.styled"

interface IProps {}

export const Content: React.FC<IProps> = () => {
  const [infoKey, setInfoKey] = useState<null | string>(null)

  const current = useSelector(getCurrentLocation)
  const locations = useSelector(getFilteredLocations)
  const locationsCount = useSelector(getFilteredLocationsCount)

  const renderMarkers = useCallback(
    (dataset: Array<LocationModel>, entity: string, icon?: string) =>
      dataset.map(({ uuid, point, title, image, description }) => (
        <GoogleMap.Marker
          useInFitBounds
          key={uuid}
          position={point}
          onClick={() => setInfoKey(uuid === infoKey ? null : uuid)}
          icon={icon ? { url: icon } : undefined}
        >
          {infoKey === uuid && entity && (
            <GoogleMap.InfoWindow onCloseClick={() => setInfoKey(null)}>
              <Styled.MarkerInfoContainer>
                <Link to={`/locations/${entity}/${uuid}`}>{title}</Link>
                <p>{truncate(description, { length: 100 })}</p>
                <img src={image} alt={title} />
              </Styled.MarkerInfoContainer>
            </GoogleMap.InfoWindow>
          )}
        </GoogleMap.Marker>
      )),
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

export default Content
