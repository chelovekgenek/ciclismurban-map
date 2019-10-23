import moment from "moment"

import { MapOptions } from "helpers"
import { EventModel } from "models/location"

export class EventFormValues extends EventModel {
  constructor(props?: EventModel) {
    super()

    if (props) {
      this.title = props.title
      this.description = props.description
      this.point = props.point
      this.image = props.image
      this.startedAt = props.startedAt
    }
  }

  title = ""
  description = ""
  point = MapOptions.position
  image = ""
  startedAt = moment().toISOString()
}
