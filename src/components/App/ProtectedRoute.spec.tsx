import React from "react"
import { Redirect } from "react-router-dom"
import { shallow } from "enzyme"

import { ProtectedRoute } from "./ProtectedRoute"

describe("ProtectedRoute", () => {
  const render = (props: Partial<React.ComponentProps<typeof ProtectedRoute>> = {}) =>
    (shallow(
      <ProtectedRoute
        attempts={0}
        fetching={false}
        authenticated={false}
        component={() => <span>privet</span>}
        location={{ pathname: "/" } as any}
        {...props}
      />,
    )
      .find("Route")
      .prop("render") as Function)({ location: {} })
  it("should render component if user is authenticated", () => {
    const wrapper = render({ authenticated: true, attempts: 1 })
    expect(wrapper).toBeDefined()
  })
  it("should not render component if user is authenticating", () => {
    const wrapper = render({ fetching: true })
    expect(wrapper).toBeNull()
  })
  it("should render redirect if user authentication attempt is failed", () => {
    const wrapper = render({ attempts: 1 })
    expect(wrapper).toStrictEqual(
      <Redirect
        to={{
          pathname: "/",
          state: {
            from: {},
          },
        }}
      />,
    )
  })
})
