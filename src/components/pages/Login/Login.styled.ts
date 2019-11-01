import styled, { css } from "styled-components"

import * as UI from "components/generic/ui"

export const Icon = styled(UI.Icon)`
  color: rgba(0, 0, 0, 0.25);
`
interface IButtonProps {
  marginBottom?: boolean
}
export const Button = styled(UI.Button)<IButtonProps>`
  width: 100%;
  ${({ marginBottom = false }) =>
    marginBottom &&
    css`
      margin-bottom: 1.2rem;
    `}
`

export const CenterText = styled.div`
  text-align: center;
`
