import React, { useCallback, useMemo } from "react"

import * as Styled from "./Legend.styled"
import { IStateProps, IDispatchProps } from "./Legend.container"

interface IProps extends IStateProps, IDispatchProps {}

export const Legend: React.FC<IProps> = ({ filters, toggle }) => {
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
          label: "События",
          value: "events",
        },
        {
          label: "Парковки",
          value: "parkings",
        },
        {
          label: "Сервисы",
          value: "services",
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
