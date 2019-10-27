import React, { useState, useCallback, useMemo } from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"

import { Icon } from "components/generic/ui"
import { ClickParam } from "antd/lib/menu"

import options from "./Sider.options.json"
import * as Styled from "./Sider.styled"

interface IProps extends RouteComponentProps {}

export const Sider: React.FC<IProps> = ({ history, match }) => {
  const [collapsed, setCollapsed] = useState(false)
  const handleClickItem = useCallback(({ key }: ClickParam) => history.push(key), [history])
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
          <Styled.MenuItem key={item.link} onClick={handleClickItem}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Styled.MenuItem>
        ))}
      </Styled.Menu>
    </Styled.Sider>
  )
}

export default withRouter(Sider)
