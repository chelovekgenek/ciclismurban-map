import React from "react"

import { Layout } from "components/generic/ui"
import { GoogleMap } from "components/generic/GoogleMap"

import * as Styled from "./MainLayout.styled"

const { Content, Sider } = Layout

export const MainLayout: React.FC = () => (
  <Styled.Container>
    <Sider>text</Sider>
    <Layout>
      <Content>
        <GoogleMap containerElement={<Styled.MapContainer />} mapElement={<Styled.Map />} />
      </Content>
    </Layout>
  </Styled.Container>
)
