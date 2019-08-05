import React, { useState, useCallback } from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"

import { Icon } from "components/generic/ui"
import { ClickParam } from "antd/lib/menu"

import options from "./Sider.options.json"
import * as Styled from "./Sider.styled"

interface IProps extends RouteComponentProps {}

export const Sider: React.FC<IProps> = ({ history }) => {
  const [collapsed, setCollapsed] = useState(false)
  const handleClickItem = useCallback(({ key }: ClickParam) => history.push(options[Number(key)].link), [history])
  return (
    <Styled.Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Styled.Menu>
        {options.map((item, index) => (
          <Styled.MenuItem key={index} onClick={handleClickItem}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Styled.MenuItem>
        ))}
      </Styled.Menu>
    </Styled.Sider>
  )
}

export default withRouter(Sider)
