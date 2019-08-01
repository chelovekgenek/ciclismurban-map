import { InfoWindow } from "react-google-maps"
import { default as Map } from "./GoogleMap"
import { Marker } from "./Marker"

export const GoogleMap = Object.assign(Map, {
  Marker,
  InfoWindow,
})
