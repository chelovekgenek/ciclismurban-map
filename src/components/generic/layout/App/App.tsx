import React from "react"

import * as Styled from "./App.styled"

interface IProps {
  children: React.ReactNode
  useContentLayout?: boolean
}

export const App: React.FC<IProps> = ({ children, useContentLayout }) => (
  <Styled.Layout>
    {/* <Layout.Sider width="14rem" theme="light">
      privet
    </Layout.Sider> */}
    <Styled.Content>{useContentLayout ? <Styled.ContentLayout children={children} /> : children}</Styled.Content>
  </Styled.Layout>
)
