import { ProfileModel } from "@ciclismurban/models"

export class ProfileFormValues extends ProfileModel {
  constructor(props: Partial<ProfileModel> = {}) {
    super()

    if (props.avatar) {
      this.avatar = props.avatar
    }
    if (props.status) {
      this.status = props.status
    }
    if (props.description) {
      this.description = props.description
    }
    if (props.facebook) {
      this.facebook = props.facebook
    }
    if (props.telegram) {
      this.telegram = props.telegram
    }
  }
}
