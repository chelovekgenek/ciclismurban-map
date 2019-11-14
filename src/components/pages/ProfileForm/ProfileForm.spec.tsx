import React from "react"
import { shallow } from "enzyme"

import formProps from "mocks/formik-form-props"
import user from "mocks/user.json"

import { ProfileForm } from "./ProfileForm"
import { ProfileFormValues } from "./ProfileForm.scheme"

describe("pages/ProfileForm", () => {
  const initialValues = new ProfileFormValues()
  const render = (props: Partial<React.ComponentProps<typeof ProfileForm>> = {}) =>
    shallow(
      <ProfileForm
        {...formProps}
        initialValues={initialValues}
        values={initialValues}
        fetching={false}
        profile={user.profile}
        save={jest.fn() as any}
        {...props}
      />,
    )
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
  it("should be able to reset form if touched", () => {
    const wrapper = render({ touched: { description: true } })
    expect((wrapper.find("App").prop("content") as any).actions[0].props.disabled).toBe(false)
  })
})
