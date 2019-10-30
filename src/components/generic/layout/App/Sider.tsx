import React, { useState, useMemo } from "react"
import { withRouter, RouteComponentProps, Link } from "react-router-dom"

import { Icon } from "components/generic/ui"

import options from "./Sider.options.json"
import * as Styled from "./Sider.styled"

interface IProps extends RouteComponentProps {}

export const Sider: React.FC<IProps> = ({ match }) => {
  const [collapsed, setCollapsed] = useState(false)
  const selected = useMemo(() => {
    for (let option of options) {
      if (option.link === match.path || (option.routes && option.routes.includes(match.path))) {
        return [option.link]
      }
    }
    return []
  }, [match.path])
  return (
    <Styled.Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Styled.Menu selectedKeys={selected}>
        {options.map(item => (
          <Styled.MenuItem key={item.link}>
            <Icon type={item.icon} />
            <Link to={item.link}>{item.title}</Link>
          </Styled.MenuItem>
        ))}
      </Styled.Menu>
    </Styled.Sider>
  )
}

export default withRouter(Sider)
