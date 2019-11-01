import React from "react"
import { shallow } from "enzyme"

import { LoginGoogleButton } from "./LoginGoogleButton"

describe("LoginFacebookButton", () => {
  const render = (props: Partial<React.ComponentProps<typeof LoginGoogleButton>> = {}) =>
    shallow(<LoginGoogleButton login={jest.fn() as any} {...props} />)
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
})
