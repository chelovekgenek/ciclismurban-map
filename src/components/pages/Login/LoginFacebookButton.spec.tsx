import React from "react"
import { shallow } from "enzyme"

import { LoginFacebookButton } from "./LoginFacebookButton"

describe("LoginFacebookButton", () => {
  const render = (props: Partial<React.ComponentProps<typeof LoginFacebookButton>> = {}) =>
    shallow(<LoginFacebookButton login={jest.fn() as any} {...props} />)
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
})
