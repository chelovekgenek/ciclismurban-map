import React from "react"
import { withRouter, RouteComponentProps } from "react-router"

import * as Styled from "./ContentHeader.style"

interface IProps extends RouteComponentProps {
  title: string
  extra?: React.ReactNode[]
}

export const ContentHeader: React.FC<IProps> = ({ title, history, extra }) => (
  <Styled.Header onBack={history.goBack} title={title} extra={extra} />
)

export default withRouter(ContentHeader)
