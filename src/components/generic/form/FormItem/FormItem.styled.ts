import styled from "styled-components"

import { Form as AntForm } from "antd"

export const FormItem = styled(AntForm.Item)`
  &.ant-form-item {
    display: flex;
  }
  .ant-form-item-control-wrapper {
    width: 100%;
  }
`
