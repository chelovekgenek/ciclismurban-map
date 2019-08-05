export const getBase64 = (blob: Blob, callback: (result: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result as string))
  reader.readAsDataURL(blob)
}
