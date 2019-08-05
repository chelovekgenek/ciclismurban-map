import React from "react"
import { Field, FieldProps } from "formik"
import moment, { Moment } from "moment"

import { FormItem } from "../FormItem"
import * as Styled from "./DateTimePicker.styled"

const format = "DD/MM/YYYY HH:mm"

interface IProps {
  name: string
  placeholder?: string
}

export const DateTimePicker: React.FC<IProps> = ({ name, placeholder }) => (
  <Field name={name}>
    {({ field, form }: FieldProps) => {
      const handler = (date: Moment) => form.setFieldValue(name, date.toISOString())

      return (
        <FormItem touched={form.touched[field.name]} error={form.errors[field.name]}>
          <Styled.DateTimePicker
            showTime
            allowClear={false}
            placeholder={placeholder}
            value={moment(field.value)}
            format={format}
            onChange={handler}
            onOk={handler}
          />
        </FormItem>
      )
    }}
  </Field>
)
