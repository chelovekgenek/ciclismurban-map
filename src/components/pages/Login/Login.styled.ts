import styled from "styled-components"

import * as UI from "components/generic/ui"

export const Icon = styled(UI.Icon)`
  color: rgba(0, 0, 0, 0.25);
`

export const Button = styled(UI.Button)`
  width: 100%;
  &:not(:last-of-type) {
    margin-bottom: 1.2rem;
  }
`

export const CenterText = styled.div`
  text-align: center;
`
