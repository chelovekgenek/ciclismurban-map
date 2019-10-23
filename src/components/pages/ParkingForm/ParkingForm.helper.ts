import { MapOptions } from "helpers"
import { ParkingModel } from "models/location"

export class ParkingFormValues extends ParkingModel {
  constructor(props?: ParkingModel) {
    super()

    if (props) {
      this.title = props.title
      this.description = props.description
      this.point = props.point
      this.image = props.image
    }
  }

  title = ""
  description = ""
  point = MapOptions.position
  image = ""
}
