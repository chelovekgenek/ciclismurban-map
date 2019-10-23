import { FormikBag } from "formik"

import { getSelectedRoot } from "store/entities/locations"
import { difference } from "./difference"

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
