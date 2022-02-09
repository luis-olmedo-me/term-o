import React from 'react'
import { Hash, Log } from './LogWrapper.styles'

export const LogWrapper = ({ children, variant }) => {
  return (
    <Log className={variant}>
      {variant === 'command' ? <Hash>$</Hash> : null}
      {children}
    </Log>
  )
}
