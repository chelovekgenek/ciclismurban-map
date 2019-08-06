import styled from "styled-components"

import { PageHeader as AntPageHeader } from "antd"

export const Header = styled(AntPageHeader)`
  &.ant-page-header {
    background-color: inherit;
    padding-left: 0;
    padding-right: 0;
  }
  .ant-page-header-title-view-title {
    font-size: 1.2rem;
  }
`
