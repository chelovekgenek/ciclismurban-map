import styled from "styled-components"
import { ReactComponent as LogoIcon } from "assets/logo.svg"

import { Layout as AntdLayout } from "antd"

export const Container = styled(AntdLayout.Header)``

export const Logo = styled(LogoIcon)`
  height: 100%;
  fill: white;
  cursor: pointer;
  transform: scaleX(-1);
`

export const SectionRight = styled.div`
  color: white;
  position: relative;
  float: right;
`

export const Profile = styled.span`
  cursor: pointer;
  &:hover {
    color: lightblue;
  }
`
