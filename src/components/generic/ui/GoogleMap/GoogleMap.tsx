/* global google */

import React, { useRef, useMemo, useEffect } from "react"
import { GoogleMap as MapComponent, withGoogleMap, GoogleMapProps, Marker, MarkerProps } from "react-google-maps"

interface IProps extends GoogleMapProps {
  children?: React.ReactNode
}

export const GoogleMap: React.FC<IProps> = ({ children, ...props }) => {
  const ref = useRef<MapComponent>(null)
  const bounds = useMemo(() => {
    const bounds = new google.maps.LatLngBounds()
    React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child
      }
      if (child.type === Marker) {
        const marker: React.ReactElement<MarkerProps> = child
        if (marker.props.position) {
          const { lat, lng } = marker.props.position
          const latLng = new google.maps.LatLng(
            typeof lat === "function" ? lat() : lat,
            typeof lng === "function" ? lng() : lng,
          )
          bounds.extend(latLng)
        }
      }
      return child
    })
    return bounds
  }, [children])
  useEffect(() => {
    const empty = bounds.isEmpty()
    if (ref.current && !empty) {
      ref.current.fitBounds(bounds)
    }
  }, [ref, bounds])
  return (
    <MapComponent ref={ref} {...props}>
      {children}
    </MapComponent>
  )
}

export default withGoogleMap(GoogleMap)
