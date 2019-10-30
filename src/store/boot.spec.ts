import { ROUTES_INDEX_PATH } from "constants/routes"

import { handleBoot } from "./boot"
import { CurrentActions } from "./entities/locations"
import { LoginByTokenActions } from "./entities/user"
import { history } from "./history"

describe("store.boot", () => {
  const defaultState = {
    locations: {
      filters: {
        current: true,
      },
    },
    user: {
      token: "secret",
    },
  }
  const defaultProps: any = {
    dispatch: jest.fn(),
    getState: jest.fn(() => defaultState),
  }
  it("should dispatch polling if filters.current is enabled", async () => {
    await handleBoot(defaultProps)()
    expect(defaultProps.dispatch).toBeCalledWith(CurrentActions.pollingStart())
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
      getState: jest.fn(() => ({ ...defaultState, user: { token: undefined } })),
    })()
    expect(spyHistoryReplace).toBeCalledWith(ROUTES_INDEX_PATH)
  })
})
