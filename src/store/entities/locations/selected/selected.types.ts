export enum Get {
  REQUEST = "LOCATION__SELECTED__GET__REQUEST",
  SUCCESS = "LOCATION__SELECTED__GET__SUCCESS",
  FAILURE = "LOCATION__SELECTED__GET__FAILURE",
}

export const SET = "LOCATION__SELECTED__SET"
export const CLEAR = "LOCATION__SELECTED__CLEAR"

export const ACCEPTED_ENTITIES = ["events", "parkings", "services", "shops"] as const
export type TAcceptedEntity = typeof ACCEPTED_ENTITIES[number]
