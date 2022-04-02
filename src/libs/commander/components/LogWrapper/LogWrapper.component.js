import React from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  GroupButtons,
  GroupButton,
  Hash,
  Log,
  LogContent
} from './LogWrapper.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '$',
  [parameterTypes.ERROR]: '✖',
  [parameterTypes.INFO]: 'ℹ',
  [parameterTypes.SUCCESS]: '✔'
}

export const LogWrapper = ({ children, variant, buttonGroups }) => {
  const icon = preIconsByVariants[variant]
  const hasButtonGroups = Boolean(buttonGroups?.length)

  return (
    <Log className={variant}>
      <LogContent>
        {icon && <Hash>{icon}</Hash>}

        {children}
      </LogContent>

      {hasButtonGroups && (
        <GroupButtons>
          {buttonGroups.map(({ id, text, onClick, disabled, selected }) => {
            return (
              <GroupButton
                key={id}
                onClick={onClick}
                disabled={disabled}
                selected={selected}
              >
                {text}
              </GroupButton>
            )
          })}
        </GroupButtons>
      )}
    </Log>
  )
}
