import React from "react"

import * as Styled from "./MainLayout.styled"
import { Layout } from "components/generic/ui"

interface IProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<IProps> = ({ children }) => (
  <Styled.Layout>
    {/* <Layout.Sider width="14rem" theme="light">
      privet
    </Layout.Sider> */}
    <Layout.Content>{children}</Layout.Content>
  </Styled.Layout>
)
