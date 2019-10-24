import React from "react"
import { shallow } from "enzyme"

import services from "mocks/services.json"

import { Services } from "./Services"

describe("pages/Services", () => {
  const render = (props: Partial<React.ComponentProps<typeof Services>> = {}) =>
    shallow(
      <Services
        services={services as any}
        fetching={false}
        getServices={jest.fn() as any}
        deleteService={jest.fn() as any}
        {...props}
      />,
    )
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
})
