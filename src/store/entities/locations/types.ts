export const ACCEPTED_ENTITIES = ["events", "parkings", "services", "shops"] as const
export type TAcceptedEntity = typeof ACCEPTED_ENTITIES[number]
