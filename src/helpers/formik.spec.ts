import { handleLocationFormSubmit } from "./formik"

describe("helpers/formik", () => {
  describe("handleLocationFormSubmit", () => {
    const values = { asd: "fgh", zxc: "vbn" }
    it("should call `props.create` function with payload if `selected.data` is empty", () => {
      const bag = {
        props: {
          selected: {
            data: undefined,
          },
          create: jest.fn(),
        },
      }
      handleLocationFormSubmit(values, bag as any)
      expect(bag.props.create).toBeCalledWith(values)
    })
    it("should call `props.update` function with filtered payload if `selected.data` exists", () => {
      const bag = {
        props: {
          selected: {
            data: { uuid: "uuid", asd: "qwe", zxc: "vbn" },
          },
          update: jest.fn(),
        },
      }
      handleLocationFormSubmit(values, bag as any)
      expect(bag.props.update).toBeCalledWith({ uuid: bag.props.selected.data.uuid, payload: { asd: "fgh" } })
    })
  })
})
