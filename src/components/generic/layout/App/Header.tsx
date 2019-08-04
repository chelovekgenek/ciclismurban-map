import React from "react"
import { Link } from "react-router-dom"

import { Divider } from "components/generic/ui"

import * as Styled from "./Header.style"

export const Header: React.FC = () => (
  <Styled.Container>
    <Link to="/">
      <Styled.Logo />
    </Link>
    <Styled.SectionRight>
      <Link to="/login">Войти</Link>
      <Divider type="vertical" />
      <Link to="/register">Зарегестрироваться</Link>
    </Styled.SectionRight>
  </Styled.Container>
)
