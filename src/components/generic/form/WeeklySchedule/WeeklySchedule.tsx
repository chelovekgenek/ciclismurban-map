import React, { useMemo } from "react"
import { Field, FieldProps } from "formik"
import { pullAt, cloneDeep } from "lodash-es"
import { WeeklyScheduleModel } from "@ciclismurban/models"

import { Grid } from "components/generic/layout"
import { FormItem } from "../FormItem"

import options from "./options.json"
import { DailyRangeSchedule } from "./DailyRangeSchedule"

const defaultValue = {
  from: "08:00",
  to: "20:00",
}

interface IProps {
  name: string
  label?: string
}

type TDailyRangeSchedule = Required<React.ComponentProps<typeof DailyRangeSchedule>>

export const WeeklyScheduleWrapper: React.FC<IProps> = ({ name, label }) => (
  <Field name={name}>{(fieldProps: FieldProps) => <WeeklySchedule {...fieldProps} label={label} name={name} />}</Field>
)

export const WeeklySchedule: React.FC<FieldProps & IProps> = ({ field, form, label }) => {
  const list = useMemo(
    () =>
      Object.entries(options.titles).map(([key, title]) => {
        const values = field.value[key] as WeeklyScheduleModel[keyof typeof options.titles]
        const setFieldValue = (nextValues: typeof values) => {
          form.setFieldValue(field.name, { ...field.value, [key]: nextValues })
          form.setFieldTouched(field.name, true)
        }
        const handleAdd = () => {
          const nextValues = values.concat(defaultValue)
          setFieldValue(nextValues)
        }
        const handleCancel = (index: number) => () => {
          const nextValues = cloneDeep(values)
          pullAt(nextValues, [index])
          setFieldValue(nextValues)
        }
        const handleFieldChange = (index: number): TDailyRangeSchedule["onChange"] => v => {
          const nextValues = cloneDeep(values)
          nextValues.splice(index, 1, v)
          setFieldValue(nextValues)
        }
        return (
          <Grid.Row key={key}>
            <Grid.Col span={3}>{title}</Grid.Col>
            <Grid.Col span={21}>
              {values.length ? (
                Object.values(values).map((item, i) => (
                  <DailyRangeSchedule
                    key={i}
                    value={item}
                    onChange={handleFieldChange(i)}
                    onCancel={handleCancel(i)}
                    {...{
                      onAdd: i === values.length - 1 ? handleAdd : undefined,
                    }}
                  />
                ))
              ) : (
                <DailyRangeSchedule onAdd={handleAdd} />
              )}
            </Grid.Col>
          </Grid.Row>
        )
      }),
    [field.value, field.name, form],
  )
  return (
    <FormItem label={label} touched={form.touched[field.name]} error={form.errors[field.name]}>
      {list}
    </FormItem>
  )
}
