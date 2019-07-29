declare interface IPoint {
  lat: number
  lng: number
}

declare interface ILocation {
  title?: string
  image?: string
  point: IPoint
}
