import React, { useCallback, useMemo } from "react"
import { connect } from "react-redux"

import { TAppState } from "store/entities"
import { FiltersActions, getFilters } from "store/entities/locations"

import * as Styled from "./Legend.styled"

interface IStateProps {
  filters: ReturnType<typeof getFilters>
}
interface IDispatchProps {
  toggle: typeof FiltersActions.toggle
}

interface IProps extends IStateProps, IDispatchProps {}

export const Sider: React.FC<IProps> = ({ filters, toggle }) => {
  const handleChange = useCallback(
    ({ target: { value } }) => {
      toggle(value)
    },
    [toggle],
  )
  const options = useMemo(
    () =>
      [
        {
          label: "Мое местоположение",
          value: "current",
        },
        {
          label: "Сервисы",
          value: "services",
        },
        {
          label: "Парковки",
          value: "parkings",
        },
        {
          label: "Магазины",
          value: "shops",
        },
      ].map(item => ({ ...item, onChange: handleChange })),
    [handleChange],
  )
  const value = useMemo(() => Object.keys(filters).filter(item => filters[item as keyof typeof filters]), [filters])
  return (
    <Styled.Container>
      <h3>Легенда</h3>
      <Styled.Controlls options={options} value={value} />
    </Styled.Container>
  )
}

export default connect<IStateProps, IDispatchProps, null, TAppState>(
  state => ({
    filters: getFilters(state),
  }),
  {
    toggle: FiltersActions.toggle,
  },
)(Sider)
