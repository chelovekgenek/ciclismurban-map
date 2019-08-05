import React from "react"
import { Field, FieldProps } from "formik"
import { Input as AntInput } from "antd"
import { InputProps } from "antd/lib/input"

import { FormItem } from "../FormItem"

interface IProps extends InputProps {
  name: string
  label?: string
}

export const Input: React.FC<IProps> = ({ name, label, ...props }) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => (
      <FormItem touched={form.touched[field.name]} error={form.errors[field.name]}>
        <AntInput name={name} value={form.values[name]} onChange={field.onChange} onBlur={field.onBlur} {...props} />
      </FormItem>
    )}
  </Field>
)
