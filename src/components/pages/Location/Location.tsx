import React, { useEffect } from "react"
import { RouteComponentProps } from "react-router"

import { Layout } from "components/generic"
import { Empty, Spinner, GoogleMap } from "components/generic/ui"
import { Types } from "store/entities/locations/selected"
import { ROUTES_INDEX_PATH } from "constants/routes"

import * as Styled from "./Location.styled"
import { IStateProps, IDispatchProps } from "./Location.container"

interface IParams {
  entity: Types.TAcceptedEntity
  id: string
}

interface IProps extends RouteComponentProps<IParams>, IStateProps, IDispatchProps {}

export const Location: React.FC<IProps> = ({ history, match, getSelected, selected, fetching, clearSelected }) => {
  useEffect(() => {
    const { entity, id } = match.params
    if (!Types.ACCEPTED_ENTITIES.includes(entity)) {
      return history.replace(ROUTES_INDEX_PATH)
    }

    getSelected({ entity, uuid: id })

    return () => {
      clearSelected()
    }
  }, [getSelected, history, match.params, clearSelected])

  if (fetching) {
    return <Spinner />
  }
  if (!selected) {
    return <Empty />
  }

  return (
    <Layout.App content={{ useLayout: true, useHeader: true, title: selected.title }}>
      <p>{selected.description}</p>
      <Styled.Image src={selected.image} alt={selected.title} />
      <Styled.MapContainer>
        <GoogleMap zoom={16} center={selected.point}>
          <GoogleMap.Marker position={selected.point} />
        </GoogleMap>
      </Styled.MapContainer>
    </Layout.App>
  )
}
