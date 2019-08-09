import React from "react"
import { useSelector } from "react-redux"

import { getAuthenticated } from "store/entities/user"
import { Redirect } from "react-router"

interface IProps {
  children: React.ReactNode
  redirect?: boolean
}

export const Authentication: React.FC<IProps> = ({ children, redirect }) => {
  const authenticated = useSelector(getAuthenticated)
  if (!authenticated) {
    return redirect ? <Redirect to="/" /> : null
  }
  return <React.Fragment>{children}</React.Fragment>
}
