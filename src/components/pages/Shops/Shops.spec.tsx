import React from "react"
import { shallow } from "enzyme"

import shops from "mocks/shops.json"

import { Shops } from "./Shops"

describe("pages/Shops", () => {
  const render = (props: Partial<React.ComponentProps<typeof Shops>> = {}) =>
    shallow(
      <Shops
        shops={shops as any}
        fetching={false}
        getShops={jest.fn() as any}
        deleteShop={jest.fn() as any}
        {...props}
      />,
    )
  it("should match snapshot", () => {
    expect(render()).toMatchSnapshot()
  })
})
