import React, { useMemo } from "react"
import { Link } from "react-router-dom"

import { Divider, Dropdown, Menu, Icon, Avatar } from "components/generic/ui"

import * as Styles from "./Header.style"
import { IStateProps, IDispatchProps } from "./Header.container"

interface IProps extends IStateProps, IDispatchProps {}

export const Header: React.FC<IProps> = ({ authenticated, email, avatar, logout }) => (
  <Styles.Container>
    <Link to="/">
      <Styles.Logo />
    </Link>
    <Styles.SectionRight>
      {useMemo(
        () =>
          authenticated ? (
            <React.Fragment>
              <Avatar src={avatar} />
              <Dropdown
                overlay={
                  <Menu>
                    <Styles.MenuItem>
                      <Link to="/profile">
                        <Icon type="user" />
                        Профиль
                      </Link>
                    </Styles.MenuItem>
                    <Styles.MenuItem onClick={logout}>
                      <Icon type="logout" />
                      Выйти
                    </Styles.MenuItem>
                  </Menu>
                }
              >
                <Styles.Profile>
                  {email} <Icon type="down" />
                </Styles.Profile>
              </Dropdown>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to="/login">Войти</Link>
              <Divider type="vertical" />
              <Link to="/register">Зарегестрироваться</Link>
            </React.Fragment>
          ),
        [authenticated, email, avatar, logout],
      )}
    </Styles.SectionRight>
  </Styles.Container>
)
