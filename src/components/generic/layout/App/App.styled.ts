import styled from "styled-components"
import { Layout as AntLayout } from "antd"

interface ILayout {
  fullHeight?: boolean
}
export const Layout = styled(AntLayout)<ILayout>`
  height: ${({ fullHeight = true }) => (fullHeight ? "inherit" : "100%")};
`

export const Content = styled(AntLayout.Content)`
  height: 100%;
  position: relative;
`

export const ContentLayout = styled.div`
  height: 100%;
  width: 1024px;
  padding: 1rem;
  margin: auto;
`
