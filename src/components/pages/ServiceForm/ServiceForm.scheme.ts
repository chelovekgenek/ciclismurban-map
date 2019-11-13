import { ServiceModel, WeeklyScheduleModel } from "@ciclismurban/models"
import { MapOptions } from "helpers"

export class ServiceFormValues extends ServiceModel {
  constructor(props?: ServiceModel) {
    super()

    if (props) {
      this.title = props.title
      this.description = props.description
      this.point = props.point
      this.image = props.image
      this.schedule = props.schedule
    }
  }

  title = ""
  description = ""
  point = MapOptions.position
  image = ""
  schedule: WeeklyScheduleModel = {
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  }
}
