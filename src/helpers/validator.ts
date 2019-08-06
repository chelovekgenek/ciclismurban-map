import {
  transformAndValidateEntitySync,
  IFlatValidationError,
} from "@ciclismurban/api/dist/src/modules/commons/helpers/validator"
import { ClassType } from "class-transformer/ClassTransformer"

import { FormikValues } from "formik"

export const validateEntity = (
  entity: ClassType<object>,
  values: object | Array<object>,
  groups: string[],
): { [key: string]: string } => {
  try {
    transformAndValidateEntitySync(entity, values, {
      validator: {
        groups,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false, value: false },
      },
      transformer: {
        groups,
      },
    })
    return {}
  } catch (e) {
    const errors: Array<IFlatValidationError> = e
    return errors.reduce<{ [key: string]: string }>((acc, value) => {
      acc[value.path] = value.message
      return acc
    }, {})
  }
}

export const validateFormik = (entity: ClassType<object>, groups: string[]) => (values: FormikValues) =>
  validateEntity(entity, values, groups)
