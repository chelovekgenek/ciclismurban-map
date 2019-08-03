import { get } from "lodash-es"

import { PointModel } from "models/location"

export const getCurrentLatLng = (): Promise<PointModel> =>
  new Promise((resolve, reject) => {
    const getLocation = get(navigator, "geolocation.getCurrentPosition")
    if (!getLocation) {
      reject("Navigator not found")
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        resolve({ lat, lng })
      },
      error => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    )
  })
