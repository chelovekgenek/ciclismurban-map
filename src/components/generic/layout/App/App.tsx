import React from "react"
import { Link } from "react-router-dom"

import { Divider } from "components/generic/ui"

import * as Styled from "./App.styled"

interface IProps {
  children: React.ReactNode
  useContentLayout?: boolean
}

export const App: React.FC<IProps> = ({ children, useContentLayout }) => (
  <Styled.Layout>
    <Styled.Header theme="light">
      <Styled.HeaderRightSection>
        <Link to="/login">Войти</Link>
        <Divider type="vertical" />
        <Link to="/register">Зарегестрироваться</Link>
      </Styled.HeaderRightSection>
    </Styled.Header>
    <Styled.Content>{useContentLayout ? <Styled.ContentLayout children={children} /> : children}</Styled.Content>
  </Styled.Layout>
)
