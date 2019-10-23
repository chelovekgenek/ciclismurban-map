import { difference } from "./difference"

describe("helpers/difference", () => {
  const obj1 = {
    string: "string",
    number: 123,
    array: [],
    arrayWithValues: [1, "2", {}, []],
    object: {},
  }
  const obj2 = {
    number: 123,
    array: [],
    object: {},
  }
  it("should return a result object", () => {
    expect(difference({}, {})).toStrictEqual({})
  })
  it("should return difference between two objects", () => {
    expect(difference(obj1, {})).toStrictEqual(obj1)
    expect(difference(obj1, obj2)).toStrictEqual({
      string: "string",
      arrayWithValues: [1, "2", {}, []],
    })
  })
  it("should return top level object after deep comparison", () => {
    expect(difference({ ...obj1, arrayWithValues: [1, 2, 3] }, obj1)).toStrictEqual({
      arrayWithValues: [1, 2, 3],
    })
  })
})
