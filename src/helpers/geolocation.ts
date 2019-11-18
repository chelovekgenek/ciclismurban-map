export const MapOptions = {
  zoom: 14,
  position: { lat: 47.0203966, lng: 28.829422 },
}

export const getGMapLink = ({ lat, lng }: google.maps.LatLngLiteral) => `http://maps.google.com/maps?q=${lat},${lng}`
