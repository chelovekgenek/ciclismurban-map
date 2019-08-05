import React from "react"
import { isNil } from "lodash-es"

import * as Styled from "./FormItem.styled"

interface IProps {
  children: React.ReactNode
  touched?: any
  error?: any
}

export const FormItem: React.FC<IProps> = ({ children, touched, error }) => (
  <Styled.FormItem
    {...(touched && !isNil(error)
      ? {
          validateStatus: "error",
          help: error,
        }
      : {})}
  >
    {children}
  </Styled.FormItem>
)
