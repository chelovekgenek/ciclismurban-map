import React from "react"
import { useSelector } from "react-redux"

import { Selectors } from "store/entities/auth"

interface IProps {
  children: React.ReactNode
}

export const Authentication: React.FC<IProps> = ({ children }) => {
  const authenticated = useSelector(Selectors.getAuthenticated)
  if (!authenticated) {
    return null
  }
  return <React.Fragment>{children}</React.Fragment>
}
