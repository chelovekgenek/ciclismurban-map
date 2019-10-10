import React, { useCallback, useMemo, useEffect } from "react"
import { RouteComponentProps } from "react-router"

import { Button, Table, Icon, Popconfirm } from "components/generic/ui"
import { App } from "components/generic/layout"
import { getGMapLink } from "helpers"
import { LocationModel } from "models/location"

interface IProps extends RouteComponentProps {
  title: string
  links: {
    create: string
    getInfo: (uuid: string) => string
  }
  locations: LocationModel[]
  fetching: boolean
  getLocations: () => {}
  deleteLocation: (uuid: string) => {}
}

export const Locations: React.FC<IProps> = ({
  history,
  title,
  links,
  locations,
  fetching,
  getLocations,
  deleteLocation,
}) => {
  useEffect(() => {
    getLocations()
  }, [getLocations])
  const handleCreate = useCallback(() => history.push(links.create), [history, links.create])
  const handleRowKey = useCallback((record: typeof locations[number]) => record.uuid, [locations])
  const columns = useMemo(
    () => [
      {
        title: "Название",
        dataIndex: "title",
      },
      {
        render: ({ point }: typeof locations[number]) => (
          <a target="_blank" rel="noopener noreferrer" href={getGMapLink(point)}>
            Координаты
          </a>
        ),
      },
      {
        render: ({ uuid }: typeof locations[number]) => (
          <Button.Group>
            <Button onClick={() => history.push(links.getInfo(uuid))}>
              <Icon type="edit" />
            </Button>
            <Popconfirm
              title="Вы уверены?"
              cancelText="Отменить"
              okText="Подтвердить"
              onConfirm={() => deleteLocation(uuid)}
            >
              <Button type="danger" disabled={fetching}>
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </Button.Group>
        ),
      },
    ],
    [locations, fetching, deleteLocation, links, history],
  )
  return (
    <App
      content={{
        useHeader: true,
        useLayout: true,
        title,
        actions: [
          <Button key="1" type="primary" onClick={handleCreate}>
            Создать
          </Button>,
        ],
      }}
    >
      <Table columns={columns} dataSource={locations} rowKey={handleRowKey} />
    </App>
  )
}
