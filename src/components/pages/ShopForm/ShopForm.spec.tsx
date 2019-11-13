import React from "react"
import { shallow } from "enzyme"

import formProps from "mocks/formik-form-props"
import shops from "mocks/shops.json"

import { ShopFormValues } from "./ShopForm.scheme"
import { ShopForm } from "./ShopForm"

describe("pages/ShopForm", () => {
  const initialValues = new ShopFormValues()
  const render = (props: Partial<React.ComponentProps<typeof ShopForm>> = {}) =>
    shallow(
      <ShopForm
        {...formProps}
        initialValues={initialValues}
        values={initialValues}
        shops={{ fetching: false }}
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
    expect(render({ selected: { data: shops[0] } as any })).toMatchSnapshot()
  })
  it("should retreive dataset by `match.params.id`", () => {
    // TODO https://github.com/airbnb/enzyme/issues/2091
    // const props = {
    //   match: { params: { id: "id" } } as any,
    //   getSelected: jest.fn() as any,
    // }
    // render(props)
    // expect(props.getSelected).toHaveBeenCalledWith({ entity: "shops" })
  })
  it("should be able to reset form if touched", () => {
    const wrapper = render({ selected: { data: shops[0] } as any, touched: { title: true } })
    expect((wrapper.find("App").prop("content") as any).actions[0].props.disabled).toBe(false)
  })
})
