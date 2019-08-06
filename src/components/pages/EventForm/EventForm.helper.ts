import moment from "moment"

import { MapOptions } from "helpers"

export class InitForm {
  title = ""
  description = ""
  point = MapOptions.position
  image = ""
  startedAt = moment().toISOString()
}
