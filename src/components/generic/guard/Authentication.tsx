import React from "react"
import { useSelector } from "react-redux"

import { getAuthenticated } from "store/entities/user"

interface IProps {
  children: React.ReactNode
  redirect?: boolean
}

export const Authentication: React.FC<IProps> = ({ children, redirect }) => {
  const authenticated = useSelector(getAuthenticated)
  if (!authenticated) {
    return null
  }
  return <React.Fragment>{children}</React.Fragment>
}
