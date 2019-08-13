import moment from "moment"

import { MapOptions } from "helpers"
import { EventModel } from "models/location"

export class InitForm extends EventModel {
  title = ""
  description = ""
  point = MapOptions.position
  image = ""
  startedAt = moment().toISOString()
}
