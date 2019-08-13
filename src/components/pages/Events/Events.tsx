import React, { useCallback, useMemo, useEffect } from "react"
import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router"

import { Button, Table, Icon, Popconfirm } from "components/generic/ui"
import { App } from "components/generic/layout"
import { getEventsData, EventsActions, getEventsFetching } from "store/entities/locations"
import { TAppState } from "store/entities"
import { getGMapLink } from "helpers"

interface IStateProps {
  events: ReturnType<typeof getEventsData>
  fetching: ReturnType<typeof getEventsFetching>
}
interface IDispatchProps {
  getEvents: typeof EventsActions.requestGet
  deleteEvent: typeof EventsActions.requestDelete
}
interface IProps extends IStateProps, IDispatchProps, RouteComponentProps {}

export const Events: React.FC<IProps> = ({ history, events, fetching, getEvents, deleteEvent }) => {
  useEffect(() => {
    getEvents()
  }, [getEvents])
  const handleCreate = useCallback(() => history.push("/events/new"), [history])
  const columns = useMemo(
    () => [
      {
        title: "Название",
        dataIndex: "title",
      },
      {
        render: ({ point }: typeof events[number]) => (
          <a target="_blank" rel="noopener noreferrer" href={getGMapLink(point)}>
            Координаты
          </a>
        ),
      },
      {
        render: ({ uuid }: typeof events[number]) => (
          <Popconfirm
            title="Вы уверены?"
            cancelText="Отменить"
            okText="Подтвердить"
            onConfirm={() => deleteEvent(uuid)}
          >
            <Button type="danger" disabled={fetching}>
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        ),
      },
    ],
    [events, fetching, deleteEvent],
  )
  return (
    <App
      content={{
        useHeader: true,
        useLayout: true,
        title: "События",
        actions: [
          <Button key="1" type="primary" onClick={handleCreate}>
            Создать
          </Button>,
        ],
      }}
    >
      <Table columns={columns} dataSource={events} />
    </App>
  )
}

export default connect<IStateProps, IDispatchProps, IProps, TAppState>(
  state => ({
    events: getEventsData(state),
    fetching: getEventsFetching(state),
  }),
  {
    getEvents: EventsActions.requestGet,
    deleteEvent: EventsActions.requestDelete,
  },
)(withRouter(Events))
