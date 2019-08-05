import styled from "styled-components"
import { Layout as AntdLayout } from "antd"

interface ILayout {
  fullHeight?: boolean
}
export const Layout = styled(AntdLayout)<ILayout>`
  height: ${({ fullHeight = true }) => (fullHeight ? "inherit" : "100%")};
`

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
  position: relative;
`

export const ContentLayout = styled.div`
  height: 100%;
  width: 1024px;
  padding: 1rem;
  margin: auto;
`
