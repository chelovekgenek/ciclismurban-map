import React from "react"

import * as Styles from "./Avatar.styled"

interface IProps {
  size?: number
  src?: string
}

export const Avatar: React.FC<IProps> = ({ size = 36, src }) => (
  <Styles.Avatar icon="user" shape="square" size={size} src={src} />
)
