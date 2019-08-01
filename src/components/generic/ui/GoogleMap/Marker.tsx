import React from "react"

import { Marker as GMarker, MarkerProps } from "react-google-maps"

interface IProps extends MarkerProps {
  useInFitBounds?: boolean
}

export const Marker: React.FC<IProps> = props => <GMarker {...props} />

Marker.defaultProps = {
  useInFitBounds: false,
}
