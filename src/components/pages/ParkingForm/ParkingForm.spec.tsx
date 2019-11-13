import React from "react"
import { shallow } from "enzyme"

import formProps from "mocks/formik-form-props"
import parkings from "mocks/parkings.json"

import { ParkingForm } from "./ParkingForm"
import { ParkingFormValues } from "./ParkingForm.scheme"

describe("pages/ParkingForm", () => {
  const initialValues = new ParkingFormValues()
  const render = (props: Partial<React.ComponentProps<typeof ParkingForm>> = {}) =>
    shallow(
      <ParkingForm
        {...formProps}
        initialValues={initialValues}
        values={initialValues}
        parkings={{ fetching: false }}
        selected={{ fetching: false }}
        getSelected={jest.fn() as any}
        clearSelected={jest.fn() as any}
        create={jest.fn() as any}
        update={jest.fn() as any}
        match={{ params: {} } as any}
        history={{} as any}
        location={{} as any}
        {...props}
      />,
    )
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
  it("should match snapshot if `selected.data` is provided", () => {
    expect(render({ selected: { data: parkings[0] } as any })).toMatchSnapshot()
  })
  it("should retreive dataset by `match.params.id`", () => {
    // TODO https://github.com/airbnb/enzyme/issues/2091
    // const props = {
    //   match: { params: { id: "id" } } as any,
    //   getSelected: jest.fn() as any,
    // }
    // render(props)
    // expect(props.getSelected).toHaveBeenCalledWith({ entity: "parkings" })
  })
  it("should be able to reset form if touched", () => {
    const wrapper = render({ selected: { data: parkings[0] } as any, touched: { title: true } })
    expect((wrapper.find("App").prop("content") as any).actions[0].props.disabled).toBe(false)
  })
})
