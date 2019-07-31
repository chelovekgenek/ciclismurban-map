declare interface IPoint {
  lat: number
  lng: number
}

declare interface ILocation {
  uuid?: string
  title?: string
  image?: string
  point: IPoint
  description?: string
}
