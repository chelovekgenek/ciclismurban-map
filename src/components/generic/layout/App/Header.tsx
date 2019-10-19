import React, { useMemo } from "react"
import { Link } from "react-router-dom"

import { Divider, Dropdown, Menu, Icon } from "components/generic/ui"

import * as Styled from "./Header.style"
import { IStateProps, IDispatchProps } from "./Header.container"

interface IProps extends IStateProps, IDispatchProps {}

export const Header: React.FC<IProps> = ({ authenticated, email, logout }) => (
  <Styled.Container>
    <Link to="/">
      <Styled.Logo />
    </Link>
    <Styled.SectionRight>
      {useMemo(
        () =>
          authenticated ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={logout}>
                    <Icon type="user" />
                    Выйти
                  </Menu.Item>
                </Menu>
              }
            >
              <Styled.Profile>
                {email} <Icon type="down" />
              </Styled.Profile>
            </Dropdown>
          ) : (
            <React.Fragment>
              <Link to="/login">Войти</Link>
              <Divider type="vertical" />
              <Link to="/register">Зарегестрироваться</Link>
            </React.Fragment>
          ),
        [authenticated, email, logout],
      )}
    </Styled.SectionRight>
  </Styled.Container>
)
