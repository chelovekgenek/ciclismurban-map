import { FormikBag } from "formik"
import { get } from "lodash-es"
import { LocationModel } from "@ciclismurban/models"

import { Selectors as SelectedSelectors } from "store/entities/locations/selected"
import { difference } from "./difference"
import { validateFormik } from "./validator"
import { ClassType } from "class-transformer/ClassTransformer"

interface IProps {
  update: (payload: { uuid: string; payload: Object }) => void
  create: (payload: Object) => void
  selected: ReturnType<typeof SelectedSelectors.getRoot>
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
  values: T,
) => {
  let errors = validateFormik(model, groups, ["image"])(values)
  if (!get(values, "image")) {
    errors.image = "Image must be provided"
  }
  return errors
}
