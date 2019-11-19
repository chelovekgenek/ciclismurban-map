import { Select as AntSelect } from "antd"

import { Select as SelectField } from "./Select"

export const Select = Object.assign(SelectField, {
  Option: AntSelect.Option,
})
