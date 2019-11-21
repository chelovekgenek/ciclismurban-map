import React, { useCallback, useMemo } from "react"

import * as Styled from "./Legend.styled"
import { IStateProps, IDispatchProps } from "./Legend.container"
import menuItems from "./Legend.options.json"

interface IProps extends IStateProps, IDispatchProps {}

export const Legend: React.FC<IProps> = ({ filters, toggle }) => {
  const handleChange = useCallback(
    ({ target: { value } }) => {
      toggle(value)
    },
    [toggle],
  )
  const options = useMemo(() => menuItems.map(item => ({ ...item, onChange: handleChange })), [handleChange])
  const value = useMemo(() => Object.keys(filters).filter(item => filters[item as keyof typeof filters]), [filters])
  return (
    <Styled.Container>
      <h3>Легенда</h3>
      <Styled.Controlls options={options} value={value} />
    </Styled.Container>
  )
}
