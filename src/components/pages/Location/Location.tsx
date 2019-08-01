import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router"

import { MainLayout } from "components/generic"
import { Empty, Spinner, GoogleMap } from "components/generic/ui"
import {
  TAcceptedEntity,
  ACCEPTED_ENTITIES,
  requestGetSelected,
  clearSelected,
  getSelectedData,
  getSelectedFetching,
} from "store/entities/locations"
import { TAppState } from "store/entities"

import * as Styled from "./Location.styled"

interface IParams {
  entity: TAcceptedEntity
  id: string
}
interface IStateProps {
  selected: ReturnType<typeof getSelectedData>
  fetching: ReturnType<typeof getSelectedFetching>
}
interface IDispatchProps {
  getSelected: typeof requestGetSelected
  clearSelected: typeof clearSelected
}
interface IProps extends RouteComponentProps<IParams>, IStateProps, IDispatchProps {}

export const Location: React.FC<IProps> = ({ history, match, getSelected, selected, fetching }) => {
  useEffect(() => {
    const { entity, id } = match.params
    if (!ACCEPTED_ENTITIES.includes(entity)) {
      return history.replace("/")
    }

    getSelected({ entity, uuid: id })

    return () => {
      clearSelected()
    }
  }, [getSelected, history, match.params])

  if (fetching) {
    return <Spinner />
  }
  if (!selected) {
    return <Empty />
  }

  return (
    <MainLayout useContentLayout>
      <h2>{selected.title}</h2>
      <p>{selected.description}</p>
      <Styled.Image src={selected.image} alt={selected.title} />
      <Styled.MapContainer>
        <GoogleMap zoom={16} center={selected.point}>
          <GoogleMap.Marker position={selected.point} />
        </GoogleMap>
      </Styled.MapContainer>
    </MainLayout>
  )
}

export default withRouter(
  connect<IStateProps, IDispatchProps, null, TAppState>(
    state => ({
      selected: getSelectedData(state),
      fetching: getSelectedFetching(state),
    }),
    {
      getSelected: requestGetSelected,
      clearSelected,
    },
  )(Location),
)
