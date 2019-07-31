import { Marker, InfoWindow } from "react-google-maps"
import { default as GMap } from "./GoogleMap"

export const GoogleMap = Object.assign(GMap, {
  Marker,
  InfoWindow,
})
