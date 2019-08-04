import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { Divider, Dropdown, Menu, Icon } from "components/generic/ui"

import * as Styled from "./Header.style"
import { getAuthenticated, getEmail, LogoutAction } from "store/entities/user"
import { TAppState } from "store/entities"

interface IDispatchProps {
  logout: typeof LogoutAction
}
interface IStateProps {
  authenticated: ReturnType<typeof getAuthenticated>
  email: ReturnType<typeof getEmail>
}

interface IProps extends IStateProps, IDispatchProps {}

export const Header: React.FC<IProps> = ({ authenticated, email, logout }) => (
  <Styled.Container>
    <Link to="/">
      <Styled.Logo />
    </Link>
    <Styled.SectionRight>
      {authenticated ? (
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
      )}
    </Styled.SectionRight>
  </Styled.Container>
)

export default connect<IStateProps, IDispatchProps, null, TAppState>(
  state => ({
    authenticated: getAuthenticated(state),
    email: getEmail(state),
  }),
  {
    logout: LogoutAction,
  },
)(Header)
