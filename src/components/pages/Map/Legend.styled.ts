import styled from "styled-components"

import { Grid, Checkbox } from "components/generic/ui"

export const Col = styled(Grid.Col)`
  & > .ant-row {
    margin-bottom: 0.6rem;
  }
`

export const Container = styled.div`
  width: max-content;
  position: absolute;
  z-index: 1;
  background-color: lightgray;
  padding: 0.2rem;
  top: 1rem;
  left: 1rem;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.75);
`
export const Controlls = styled(Checkbox.Group)`
  &.ant-checkbox-group {
    display: inline-grid;
  }
`
