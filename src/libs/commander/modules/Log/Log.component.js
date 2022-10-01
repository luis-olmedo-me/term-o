import * as React from 'react'
import { useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  GroupButtons,
  GroupButton,
  Hash,
  LogWrapper,
  LogContent,
  AnimatedLoader,
  LoaderText,
  ScrolledLogContent
} from './Log.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '$',
  [parameterTypes.ERROR]: '✖',
  [parameterTypes.INFO]: 'ℹ',
  [parameterTypes.SUCCESS]: '✔'
}

export const Log = ({ children, variant, buttonGroups, hasScroll }) => {
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

  const hasButtonGroups = !isFakeLoading && Boolean(buttonGroups?.length)

  const Content = (
    <>
      {icon && <Hash>{icon}</Hash>}

      {children}
    </>
  )

  return (
    <LogWrapper
      className={!isFakeLoading ? variant : parameterTypes.INFO}
      onMouseDown={(event) => event.stopPropagation()}
    >
      {isFakeLoading && (
        <LogContent>
          <AnimatedLoader />
          <LoaderText>Loading</LoaderText>
        </LogContent>
      )}

      {!isFakeLoading && (
        <LogContent>
          {hasScroll ? (
            <ScrolledLogContent>{Content}</ScrolledLogContent>
          ) : (
            Content
          )}
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
    </LogWrapper>
  )
}
