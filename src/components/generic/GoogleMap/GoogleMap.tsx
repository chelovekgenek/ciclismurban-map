import React from "react"
import { GoogleMap as MapComponent, withGoogleMap, GoogleMapProps } from "react-google-maps"

interface IProps extends GoogleMapProps {
  children: React.ReactNode
}

export const GoogleMap: React.FC<IProps> = ({ children, ...props }) => (
  <MapComponent {...props}>{children}</MapComponent>
)

export default withGoogleMap(GoogleMap)
