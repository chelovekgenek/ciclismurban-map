import React from "react"
import { Field, FieldProps } from "formik"
import { Input as AntInput, Form as AntForm } from "antd"
import { InputProps } from "antd/lib/input"

interface IProps extends InputProps {
  name: string
}

export const Input: React.FC<IProps> = ({ name, ...props }) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => (
      <AntForm.Item
        {...(form.touched[field.name] && form.errors[field.name]
          ? {
              validateStatus: "error",
              help: form.errors[field.name],
            }
          : {})}
      >
        <AntInput name={name} value={form.values[name]} onChange={field.onChange} onBlur={field.onBlur} {...props} />
      </AntForm.Item>
    )}
  </Field>
)
