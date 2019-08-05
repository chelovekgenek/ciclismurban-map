import { MapOptions } from "helpers"
import moment from "moment"

export { LocationModel, PointModel, ExposeGroup } from "@ciclismurban/api/dist/src/modules/location/models"

export class LocationForm {
  title = ""
  description = ""
  point = MapOptions.position
  image = ""
  startedAt = moment().toISOString()
}
