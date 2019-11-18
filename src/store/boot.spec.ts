import { ROUTES_INDEX_PATH } from "constants/routes"

import { handleBoot } from "./boot"
import { Position } from "./entities/me"
import { LoginByTokenActions } from "./entities/auth"
import { history } from "./history"

describe("store.boot", () => {
  const defaultState = {
    locations: {
      filters: {
        current: true,
      },
    },
    auth: {
      token: "secret",
    },
  }
  const defaultProps: any = {
    dispatch: jest.fn(),
    getState: jest.fn(() => defaultState),
  }
  it("should dispatch polling if filters.current is enabled", async () => {
    await handleBoot(defaultProps)()
    expect(defaultProps.dispatch).toBeCalledWith(Position.Actions.Polling.start())
  })
  it("should dispatch login request if token exist", async () => {
    await handleBoot(defaultProps)()
    expect(defaultProps.dispatch).toBeCalledWith(LoginByTokenActions.request())
  })
  it("should redirect if token doesn't exist and user is on protected route", async () => {
    history.location.pathname = "/parkings"
    const spyHistoryReplace = jest.spyOn(history, "replace")
    await handleBoot({
      ...defaultProps,
      getState: jest.fn(() => ({ ...defaultState, auth: { token: undefined } })),
    })()
    expect(spyHistoryReplace).toBeCalledWith(ROUTES_INDEX_PATH)
  })
})
