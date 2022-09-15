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

export const LogWrapper = ({ children, variant, buttonGroups }) => {
  const icon = preIconsByVariants[variant]
  const hasButtonGroups = Boolean(buttonGroups?.length)

  const hideLoader =
    Boolean(children) ||
    children?.some?.(Boolean) ||
    variant === parameterTypes.COMMAND

  return (
    <Log
      className={hideLoader ? variant : parameterTypes.INFO}
      onMouseDown={(event) => event.stopPropagation()}
    >
      {!hideLoader && (
        <LogContent>
          <AnimatedLoader />
          <LoaderText>Loading</LoaderText>
        </LogContent>
      )}

      {hideLoader && (
        <LogContent>
          {icon && <Hash>{icon}</Hash>}

          {children}
        </LogContent>
      )}

      {hasButtonGroups && hideLoader && (
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
