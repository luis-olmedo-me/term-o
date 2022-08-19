import React from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  GroupButtons,
  GroupButton,
  Hash,
  Log,
  LogContent,
  AnimatedLoader,
  LoaderText
} from './LogWrapper.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '$',
  [parameterTypes.ERROR]: '✖',
  [parameterTypes.INFO]: 'ℹ',
  [parameterTypes.SUCCESS]: '✔'
}

export const LogWrapper = ({ children, variant, buttonGroups, isLoading }) => {
  const icon = preIconsByVariants[variant]
  const hasButtonGroups = Boolean(buttonGroups?.length)

  return (
    <Log className={variant}>
      {isLoading && (
        <>
          <AnimatedLoader />
          <LoaderText>Loading</LoaderText>
        </>
      )}

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
                className={`
                  ${selected ? 'selected' : ''}
                  ${disabled ? 'disabled' : ''}
                `}
                disabled={disabled}
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
