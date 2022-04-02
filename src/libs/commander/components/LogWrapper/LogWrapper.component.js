import React from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { GroupButton, Hash, Log } from './LogWrapper.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '$',
  [parameterTypes.ERROR]: '✖',
  [parameterTypes.INFO]: 'ℹ',
  [parameterTypes.SUCCESS]: '✔'
}

export const LogWrapper = ({ children, variant, buttonGroups }) => {
  const icon = preIconsByVariants[variant]
  return (
    <Log className={variant}>
      {icon && <Hash>{icon}</Hash>}

      {children}

      {buttonGroups?.map(({ id, text, onClick }) => {
        return (
          <GroupButton key={id} onClick={onClick}>
            {text}
          </GroupButton>
        )
      })}
    </Log>
  )
}
