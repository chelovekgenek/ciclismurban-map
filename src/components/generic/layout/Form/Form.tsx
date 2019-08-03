import React from "react"

import * as Styled from "./Form.styled"

interface IProps {
  children: React.ReactNode
  onSubmit(): void
}

export const Form: React.FC<IProps> = ({ children }) => <Styled.Form>{children}</Styled.Form>
