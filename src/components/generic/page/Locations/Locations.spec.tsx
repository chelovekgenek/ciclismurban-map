import React from "react"
import { shallow } from "enzyme"

import events from "mocks/events.json"

import { Locations } from "./Locations"

describe("generic/page/Locations", () => {
  describe("pages/EventForm", () => {
    const render = (props: Partial<React.ComponentProps<typeof Locations>> = {}) =>
      shallow(
        <Locations
          title=""
          links={{ create: "", getInfo: (v: string) => v }}
          locations={events}
          fetching={false}
          getLocations={jest.fn() as any}
          deleteLocation={jest.fn() as any}
          create={jest.fn() as any}
          match={{ params: {} } as any}
          history={{} as any}
          location={{} as any}
          {...props}
        />,
      )
    it("should match snapshot", () => {
      expect(render()).toMatchSnapshot()
    })
  })
})
