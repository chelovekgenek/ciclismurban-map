import MockAdapter from "axios-mock-adapter"

import { request } from "helpers"

import { uploadFile } from "./api"

describe("store/commons/api", () => {
  const mock = new MockAdapter(request)
  afterAll(() => {
    mock.reset()
  })
  describe("uploadFile", () => {
    beforeAll(() => {
      mock.onPost("/files").reply(200, "response")
    })
    afterAll(() => {
      mock.reset()
    })
    it("should return undefined if not a file has been provided", async () => {
      expect(uploadFile("string")).resolves.toBeUndefined()
    })
    it("should make request and return string if it was successful", async () => {
      expect(uploadFile(new File([""], "filename", { type: "text/html" }))).resolves.toBe("response")
    })
  })
})
