import React from "react"

import Header from "./Header"
import Sider from "./Sider"

import * as Styled from "./App.styled"

interface IProps {
  children: React.ReactNode
  useContentLayout?: boolean
}

export const App: React.FC<IProps> = ({ children, useContentLayout }) => (
  <Styled.Layout fullHeight={!!useContentLayout}>
    <Header />
    <Styled.Layout>
      <Sider />
      <Styled.Content>{useContentLayout ? <Styled.ContentLayout children={children} /> : children}</Styled.Content>
    </Styled.Layout>
  </Styled.Layout>
)
