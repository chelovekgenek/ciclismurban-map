import { Layout as AntdLayout } from "antd"
import styled from "styled-components"

const Sider = styled(AntdLayout.Sider)`
  &.ant-layout-sider-light {
    background-color: #f5f5f5;
  }
  .ant-layout-sider-children {
    padding: 1rem;
  }
`

export const Layout = Object.assign(AntdLayout, {
  Content: AntdLayout.Content,
  Sider: Sider,
})
