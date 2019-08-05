import React from "react"
import { Field, FieldProps } from "formik"
import { Input as AntInput } from "antd"
import { TextAreaProps } from "antd/lib/input"

import { FormItem } from "../FormItem"

interface IProps extends TextAreaProps {
  name: string
  label?: string
}

export const Textarea: React.FC<IProps> = ({ name, label, ...props }) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => (
      <FormItem touched={form.touched[field.name]} error={form.errors[field.name]}>
        <AntInput.TextArea
          name={name}
          value={form.values[name]}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...props}
        />
      </FormItem>
    )}
  </Field>
)
