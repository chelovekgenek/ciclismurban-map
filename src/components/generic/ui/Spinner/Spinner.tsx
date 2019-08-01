import React from "react"
import { Spin, Icon } from "antd"
import styled from "styled-components"

const StyledIcon = styled(Icon)`
  &.ant-spin-dot {
    font-size: 4rem;
  }
`

export const Spinner = () => <Spin indicator={<StyledIcon type="loading" spin />} />
