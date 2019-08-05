import styled from "styled-components"
import { Layout as AntdLayout } from "antd"

import * as Shared from "components/generic/ui"

export const Sider = styled(AntdLayout.Sider)`
  &.ant-layout-sider {
    background-color: #385875;
  }
`

export const Menu = styled(Shared.Menu)`
  &.ant-menu {
    margin: 1rem 0;
    background-color: inherit;
    border: none;
  }
`
export const MenuItem = styled(Shared.Menu.Item)`
  &.ant-menu-item {
    color: white;
    &.ant-menu-item-selected,
    &:hover {
      background-color: #154961 !important;
    }
  }
`
