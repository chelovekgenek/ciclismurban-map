import React from "react"
import { isNil } from "lodash-es"

import { Grid } from "components/generic/layout"

import * as Styled from "./FormItem.styled"

const { Row, Col } = Grid

interface IProps {
  label?: string
  children: React.ReactNode
  touched?: any
  error?: any
}

export const FormItem: React.FC<IProps> = ({ children, label, touched, error }) => (
  <Styled.FormItem
    {...(touched && !isNil(error)
      ? {
          validateStatus: "error",
          help: error,
        }
      : {})}
  >
    {!isNil(label) ? (
      <Row type="flex">
        <Col span={3}>{label}</Col>
        <Col span={10}>{children}</Col>
      </Row>
    ) : (
      children
    )}
  </Styled.FormItem>
)
