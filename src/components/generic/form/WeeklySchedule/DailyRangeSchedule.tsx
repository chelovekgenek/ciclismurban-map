import React, { useMemo, useCallback } from "react"
import { TimePicker } from "antd"
import { Moment } from "moment"

import { Grid } from "components/generic/layout"
import { Button } from "components/generic/ui"
import { WeeklyScheduleModel } from "models/location"

import * as Styles from "./DailyRangeSchedule.styled"
import options from "./options.json"
import { parse } from "./helpers"

interface IProps {
  value?: WeeklyScheduleModel[keyof WeeklyScheduleModel][number]
  onAdd?: () => void
  onCancel?: () => void
  onChange?: (value: Required<IProps>["value"]) => void
}

export const DailyRangeSchedule: React.FC<IProps> = ({ value, onAdd, onCancel, onChange }) => {
  const from = useMemo(() => (value ? parse(value.from) : undefined), [value])
  const to = useMemo(() => (value ? parse(value.to) : undefined), [value])
  const handleFromChange = useCallback(
    (_time: Moment, timeStr: string) =>
      onChange &&
      onChange({
        from: timeStr,
        to: value!.to,
      }),
    [value, onChange],
  )
  const handleToChange = useCallback(
    (_time: Moment, timeStr: string) =>
      onChange &&
      onChange({
        from: value!.from,
        to: timeStr,
      }),
    [value, onChange],
  )
  return (
    <Grid.Row>
      <Grid.Col span={9}>
        {from ? (
          <TimePicker format={options.format} value={from} onChange={handleFromChange} />
        ) : (
          <Styles.EmptyBox>-</Styles.EmptyBox>
        )}
      </Grid.Col>
      <Grid.Col span={9}>
        {to ? (
          <TimePicker format={options.format} value={to} onChange={handleToChange} />
        ) : (
          <Styles.EmptyBox>-</Styles.EmptyBox>
        )}
      </Grid.Col>
      <Grid.Col span={6}>
        <Styles.ActionWrapper>
          <Button icon="minus" onClick={onCancel} disabled={!onCancel} />
          <Button icon="plus" onClick={onAdd} disabled={!onAdd} />
        </Styles.ActionWrapper>
      </Grid.Col>
    </Grid.Row>
  )
}
