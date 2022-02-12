import React from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { Hash, Log } from './LogWrapper.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '＄',
  [parameterTypes.ERROR]: '✖'
}

export const LogWrapper = ({ children, variant }) => {
  const icon = preIconsByVariants[variant]
  return (
    <Log className={variant}>
      {icon && <Hash>{icon}</Hash>}
      {children}
    </Log>
  )
}
