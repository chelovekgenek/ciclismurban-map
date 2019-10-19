import React from "react"

import * as Guard from "components/generic/guard"

import { HeaderContainer as Header } from "./Header.container"
import Sider from "./Sider"
import ContentHeader from "./ContentHeader"

import * as Styled from "./App.styled"

interface IProps {
  children: React.ReactNode
  content?: {
    useLayout?: boolean
    useHeader?: boolean
    title: string
    actions?: React.ReactNode[]
  }
}

export const App: React.FC<IProps> = ({ children, content = { useLayout: false, useHeader: false, actions: [] } }) => (
  <Styled.Layout fullHeight={!!content.useLayout}>
    <Header />
    <Styled.Layout>
      <Guard.Authentication>
        <Sider />
      </Guard.Authentication>
      <Styled.Content>
        {!content.useLayout && content.useHeader && <ContentHeader title={content.title} extra={content.actions} />}
        {content.useLayout ? (
          <Styled.ContentLayout>
            {content.useHeader ? (
              <ContentHeader title={content.title} extra={content.actions} />
            ) : (
              <h2>{content.title}</h2>
            )}
            {children}
          </Styled.ContentLayout>
        ) : (
          children
        )}
      </Styled.Content>
    </Styled.Layout>
  </Styled.Layout>
)
