import React from "react"

import Sider from "./Sider"
import * as Styled from "./MainLayout.styled"
import Content from "./Content"

export const MainLayout: React.FC = () => (
  <Styled.Container>
    <Sider />
    <Content />
  </Styled.Container>
)
