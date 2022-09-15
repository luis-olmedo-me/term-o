import React, { useEffect, useState } from 'react'
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
  const isCommand = variant === parameterTypes.COMMAND

  const [isFakeLoading, setIsFakeLoading] = useState(!isCommand)

  const icon = preIconsByVariants[variant]

  useEffect(() => {
    if (isCommand) return

    const timeoutId = setTimeout(() => setIsFakeLoading(false), 500)

    return () => {
      setIsFakeLoading(false)
      clearTimeout(timeoutId)
    }
  }, [isCommand])

  const hasContentToShow = Boolean(children) || children?.some?.(Boolean)
  const hideLoader = !isFakeLoading && hasContentToShow
  const hasButtonGroups = hideLoader && Boolean(buttonGroups?.length)

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
