import React from "react"

import * as Styled from "./MainLayout.styled"

interface IProps {
  children: React.ReactNode
  useContentLayout?: boolean
}

export const MainLayout: React.FC<IProps> = ({ children, useContentLayout }) => (
  <Styled.Layout>
    {/* <Layout.Sider width="14rem" theme="light">
      privet
    </Layout.Sider> */}
    <Styled.Content>{useContentLayout ? <Styled.ContentLayout children={children} /> : children}</Styled.Content>
  </Styled.Layout>
)
