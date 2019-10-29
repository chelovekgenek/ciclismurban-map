import React from "react"
import { shallow } from "enzyme"

import fieldProps from "mocks/formik-field-props"
import weeklySchedule from "mocks/weekly-schedule.json"

import { WeeklySchedule } from "./WeeklySchedule"

describe("pages/WeeklySchedule", () => {
  const render = (props: Partial<React.ComponentProps<typeof WeeklySchedule>> = {}) =>
    shallow(
      <WeeklySchedule
        {...fieldProps}
        field={{ ...fieldProps.field, value: weeklySchedule, name: "weekly-schedule" }}
        name="weekly-schedule"
        label="weekly-schedule"
        {...props}
      />,
    )
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
})
