import React from "react"
import moment, { Moment } from "moment"
import { shallow } from "enzyme"
import { TimePicker } from "antd"

import { Button } from "components/generic/ui"

import { DailyRangeSchedule } from "./DailyRangeSchedule"
import * as helpers from "./helpers"

describe("pages/DailyRangeSchedule", () => {
  const defaultValues = {
    from: moment("2019-10-29T12:00:00.000Z"),
    to: moment("2019-10-29T20:00:00.000Z"),
  }
  const defaultProps = {
    value: { from: helpers.format(defaultValues.from), to: helpers.format(defaultValues.to) },
  }
  const render = (props: Partial<React.ComponentProps<typeof DailyRangeSchedule>> = {}) =>
    shallow(<DailyRangeSchedule {...defaultProps} {...props} />)

  const getButtonByIcon = (wrapperValues: Partial<React.ComponentProps<typeof DailyRangeSchedule>>, icon: string) => {
    const wrapper = render(wrapperValues)
    return wrapper.find(Button).filterWhere(w => w.props().icon === icon)
  }
  const getTimepickerByValue = (
    wrapperValues: Partial<React.ComponentProps<typeof DailyRangeSchedule>>,
    value: Moment,
  ) => {
    const wrapper = render(wrapperValues)
    return wrapper.find(TimePicker).findWhere(w => moment(w.prop("value")).isSame(value))
  }

  const spy = jest.spyOn(helpers, "parse")
  beforeAll(() => {
    spy.mockImplementation(v => {
      if (v === defaultProps.value.from) {
        return defaultValues.from
      }
      if (v === defaultProps.value.to) {
        return defaultValues.to
      }
      return moment()
    })
  })
  afterAll(() => {
    spy.mockRestore()
  })
  it("should match snapshot if value was not passed", () => {
    expect(render({ value: undefined })).toMatchSnapshot()
  })
  it("should match snapshot if value was passed", () => {
    expect(render()).toMatchSnapshot()
  })
  it("should set minus button enabled if onCancel handler is passed", () => {
    const button = getButtonByIcon({ onCancel: jest.fn() as any }, "minus")
    expect(button.prop("disabled")).toBeFalsy()
  })
  it("should set plus button enabled if onCancel handler is passed", () => {
    const button = getButtonByIcon({ onAdd: jest.fn() as any }, "plus")
    expect(button.prop("disabled")).toBeFalsy()
  })
  it("should call onCancel handler", () => {
    const props = { onCancel: jest.fn() as any }
    const button = getButtonByIcon(props, "minus")
    button.simulate("click")
    expect(props.onCancel).toBeCalledTimes(1)
  })
  it("should call onAdd handler", () => {
    const props = { onAdd: jest.fn() as any }
    const button = getButtonByIcon(props, "plus")
    button.simulate("click")
    expect(props.onAdd).toBeCalledTimes(1)
  })
  it('should call onChange at "from" input', () => {
    const props = { onChange: jest.fn() as any }
    const timepicker = getTimepickerByValue(props, defaultValues.from)
    timepicker.simulate("change", defaultValues.to, defaultProps.value.to)
    expect(props.onChange).toBeCalledWith({
      from: "20:00",
      to: "20:00",
    })
  })
  it('should call onChange at "to" input', () => {
    const props = { onChange: jest.fn() as any }
    const timepicker = getTimepickerByValue(props, defaultValues.to)
    timepicker.simulate("change", defaultValues.from, defaultProps.value.from)
    expect(props.onChange).toBeCalledWith({
      from: "12:00",
      to: "12:00",
    })
  })
})
