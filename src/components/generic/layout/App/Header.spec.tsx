import React from "react"
import { shallow } from "enzyme"

import { Header } from "./Header"

describe("Header", () => {
  const render = (props: Partial<React.ComponentProps<typeof Header>> = {}) =>
    shallow(<Header authenticated={false} email={undefined} avatar={undefined} logout={jest.fn()} {...props} />)
  it("should match snapshot if not authenticated", () => {
    expect(render()).toMatchSnapshot()
  })
  it("should match snapshot if authenticated", () => {
    expect(render({ authenticated: true, email: "test@example.com", avatar: "link-to-pic" })).toMatchSnapshot()
  })
})
