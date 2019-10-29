import { FormikBag } from "formik"
import { has } from "lodash-es"

import { getSelectedRoot } from "store/entities/locations"
import { difference } from "./difference"
import { validateFormik } from "./validator"
import { LocationModel } from "models/location"
import { T } from "antd/lib/upload/utils"
import { ClassType } from "class-transformer/ClassTransformer"

interface IProps {
  update: (payload: { uuid: string; payload: Object }) => void
  create: (payload: Object) => void
  selected: ReturnType<typeof getSelectedRoot>
}
export const handleLocationFormSubmit = (values: Object, { props }: FormikBag<IProps, Object>) => {
  const { data: selected } = props.selected
  if (selected) {
    props.update({ uuid: selected.uuid, payload: difference(values, selected) })
  } else {
    props.create(values)
  }
}

export const getHandlerLocationFormValidate = <T = LocationModel>(model: ClassType<Object>, groups: string[]) => (
  value: T,
) => {
  let errors = validateFormik(model, groups, ["image"])(value)
  if (!has(value, "image")) {
    errors.image = "Image must be provided"
  }
  return errors
}
