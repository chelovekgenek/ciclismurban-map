import React, { useCallback } from "react"
import { connect } from "react-redux"

import { Layout, Checkbox, Grid } from "components/generic/ui"
import { TAppState } from "store/entities"
import { getRoot, toggle } from "store/entities/filters"

import * as Styled from "./Sider.styled"

const { Row } = Grid

interface IStateProps {
  filters: ReturnType<typeof getRoot>
}
interface IDispatchProps {
  toggle: typeof toggle
}

interface IProps extends IStateProps, IDispatchProps {}

export const Sider: React.FC<IProps> = ({ filters, toggle }) => {
  const toggleServices = useCallback(() => {
    toggle("services")
  }, [toggle])
  const toggleParkings = useCallback(() => {
    toggle("parkings")
  }, [toggle])
  const toggleShops = useCallback(() => {
    toggle("shops")
  }, [toggle])
  return (
    <Layout.Sider width="14rem" theme="light">
      <Styled.Col>
        <Row>
          <Checkbox checked={filters.services} onChange={toggleServices}>
            Services
          </Checkbox>
        </Row>
        <Row>
          <Checkbox checked={filters.parkings} onChange={toggleParkings}>
            Parkings
          </Checkbox>
        </Row>
        <Row>
          <Checkbox checked={filters.shops} onChange={toggleShops}>
            Shops
          </Checkbox>
        </Row>
      </Styled.Col>
    </Layout.Sider>
  )
}

export default connect<IStateProps, IDispatchProps, null, TAppState>(
  state => ({
    filters: getRoot(state),
  }),
  {
    toggle,
  },
)(Sider)
