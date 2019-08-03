import styled from "styled-components"
import { Layout as AntdLayout } from "antd"

export const Layout = styled(AntdLayout)`
  height: 100%;
`

export const Header = styled(AntdLayout.Header)``

export const Sider = styled(AntdLayout.Sider)`
  &.ant-layout-sider-light {
    background-color: #f5f5f5;
  }
  .ant-layout-sider-children {
    padding: 1rem;
  }
`

export const Content = styled(AntdLayout.Content)`
  height: 100%;
`

export const ContentLayout = styled.div`
  height: 100%;
  width: 1024px;
  padding: 1rem;
  margin: auto;
`
