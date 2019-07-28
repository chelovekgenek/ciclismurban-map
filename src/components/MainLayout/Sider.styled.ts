import styled from "styled-components"

import { Grid } from "components/generic/ui"

export const Col = styled(Grid.Col)`
  & > .ant-row:not(:last-child) {
    margin-bottom: 0.6rem;
  }
`
