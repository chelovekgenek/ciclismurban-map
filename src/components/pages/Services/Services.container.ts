import { connect } from "react-redux"

import {
  ServicesGetActions,
  ServicesDeleteActions,
  getServicesLocations,
  getServicesFetching,
} from "store/entities/locations"
import { TAppState } from "store/entities"

import { Services } from "./Services"

export interface IStateProps {
  services: ReturnType<typeof getServicesLocations>
  fetching: ReturnType<typeof getServicesFetching>
}
export interface IDispatchProps {
  getServices: typeof ServicesGetActions.request
  deleteService: typeof ServicesDeleteActions.request
}

export const ServicesContainer = connect<IStateProps, IDispatchProps, {}, TAppState>(
  state => ({
    services: getServicesLocations(state),
    fetching: getServicesFetching(state),
  }),
  {
    getServices: ServicesGetActions.request,
    deleteService: ServicesDeleteActions.request,
  },
)(Services)
