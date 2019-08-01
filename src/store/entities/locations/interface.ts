export interface IPoint {
  lat: number
  lng: number
}

export interface ILocation {
  uuid?: string
  title?: string
  image?: string
  point: IPoint
  description?: string
}
export type TRequiredLocation = Required<ILocation>

export const ACCEPTED_ENTITIES = ["parkings", "services", "shops"] as const
export type TAcceptedEntity = typeof ACCEPTED_ENTITIES[number]
