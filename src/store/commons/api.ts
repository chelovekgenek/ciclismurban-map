import { request } from "helpers"

export const uploadFile = async (file: any): Promise<string | undefined> => {
  if (!(file instanceof File)) {
    return
  }
  const form = new FormData()
  form.set("file", file)

  const { data } = await request.post<string>("/files", form, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return data
}
