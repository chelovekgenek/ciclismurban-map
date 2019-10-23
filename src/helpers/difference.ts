import { transform, isEqual } from "lodash-es"

interface ILooseObject {
  [k: string]: any
}

export const difference = (obj: ILooseObject, base: ILooseObject): ILooseObject => {
  const changes = (obj: ILooseObject, base: ILooseObject): Object =>
    transform(obj, (result: ILooseObject, value: any, key: string | number) => {
      if (!isEqual(value, base[key])) {
        result[key] = value
        // result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value
      }
    })
  return changes(obj, base)
}
