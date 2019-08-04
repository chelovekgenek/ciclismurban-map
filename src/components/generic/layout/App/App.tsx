import React from "react"

import { Header } from "./Header"
import * as Styled from "./App.styled"

interface IProps {
  children: React.ReactNode
  useContentLayout?: boolean
}

export const App: React.FC<IProps> = ({ children, useContentLayout }) => (
  <Styled.Layout fullHeight={!!useContentLayout}>
    <Header />
    <Styled.Content>{useContentLayout ? <Styled.ContentLayout children={children} /> : children}</Styled.Content>
  </Styled.Layout>
)
