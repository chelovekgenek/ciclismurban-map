import React from "react"
import { GoogleMap as MapComponent, withGoogleMap } from "react-google-maps"

export const GoogleMap: React.FC = () => <MapComponent defaultZoom={14} center={{ lat: 47.0203966, lng: 28.829422 }} />

export default withGoogleMap(GoogleMap)
