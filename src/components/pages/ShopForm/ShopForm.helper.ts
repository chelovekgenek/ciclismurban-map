import { MapOptions } from "helpers"
import { ShopModel, WeeklyScheduleModel } from "models/location"

export class ShopFormValues extends ShopModel {
  constructor(props?: ShopModel) {
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
