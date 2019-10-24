import { MapOptions } from "helpers"
import { ServiceModel } from "models/location"

export class ServiceFormValues extends ServiceModel {
  constructor(props?: ServiceModel) {
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
