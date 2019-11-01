import React from "react"
import { shallow } from "enzyme"

import formProps from "mocks/formik-form-props"
import { LoginForm } from "models/user"

import { Login } from "./Login"

describe("pages/Login", () => {
  const initialValues = new LoginForm()
  const render = (props: Partial<React.ComponentProps<typeof Login>> = {}) =>
    shallow(
      <Login
        {...formProps}
        initialValues={initialValues}
        values={initialValues}
        fetching={false}
        login={jest.fn() as any}
        responseError={undefined}
        {...props}
      />,
    )
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
})
