import { MapOptions } from "helpers"
import { ShopModel } from "models/location"

export class ShopFormValues extends ShopModel {
  constructor(props?: ShopModel) {
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
