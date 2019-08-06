import React from "react"

import Header from "./Header"
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
      <Sider />
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
