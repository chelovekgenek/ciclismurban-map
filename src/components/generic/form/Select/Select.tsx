import React from "react"
import { Field, FieldProps } from "formik"
import { Select as AntSelect } from "antd"
import { SelectProps } from "antd/lib/select"

import { FormItem } from "../FormItem"

interface IProps extends SelectProps {
  name: string
  label?: string
  children: React.ReactNodeArray
}

export const Select: React.FC<IProps> = ({ name, label, children, ...props }) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => (
      <FormItem label={label} touched={form.touched[field.name]} error={form.errors[field.name]}>
        <AntSelect
          value={field.value}
          onChange={(v: any) => {
            form.setFieldValue(name, v)
            form.setFieldTouched(name, true)
          }}
          onBlur={field.onBlur}
          {...props}
        >
          {children}
        </AntSelect>
      </FormItem>
    )}
  </Field>
)
