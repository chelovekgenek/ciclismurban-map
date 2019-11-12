import React from "react"
import { shallow } from "enzyme"

import { Sider } from "./Sider"
import * as Styles from "./Sider.styled"

describe("Sider", () => {
  const render = (props: Partial<React.ComponentProps<typeof Sider>> = {}) =>
    shallow(<Sider match={{ params: {} } as any} history={{} as any} location={{} as any} {...props} />)
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
  // it("should redirect to link when item was clicled", () => {
  //   const props = { history: { push: jest.fn() } }
  //   const wrapper = render(props as any)
  //   const menuItem = wrapper.find(Styles.MenuItem).at(0)
  //   menuItem.simulate("click")
  //   expect(props.history.push).toBeCalledWith("/")
  // })
  it("should not set selected menu item if doesn't match with current route", () => {
    const wrapper = render({ match: { path: "/asd", isExact: true, url: "/asd", params: {} } })
    expect(wrapper.find(Styles.Menu).prop("selectedKeys")).toEqual([])
  })
  it("should not set selected menu item if it's matching with current route", () => {
    const wrapper = render({ match: { path: "/", isExact: true, url: "/", params: {} } })
    expect(wrapper.find(Styles.Menu).prop("selectedKeys")).toEqual(["/"])
  })
  it("should set selected menu item if current route is a children", () => {
    const wrapper = render({
      match: { path: "/event/:id", isExact: true, url: "/event/12345", params: { id: "12345" } },
    })
    expect(wrapper.find(Styles.Menu).prop("selectedKeys")).toEqual(["/events"])
  })
  it("should hide title if scrollbar is collapsed", () => {
    const wrapper = render()
    ;(wrapper.find(Styles.Sider).prop("onCollapse") as Function)(true)
    expect(wrapper).toMatchSnapshot()
  })
})
