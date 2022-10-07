import * as React from 'react'
import { useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import {
  ActionGroups,
  Action,
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

export const Log = ({ children, variant, actionGroups, hasScroll }) => {
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

  const hasActionGroups = !isFakeLoading && Boolean(actionGroups?.length)

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

      {hasActionGroups && (
        <ActionGroups>
          {actionGroups.map(
            ({ id, text, onClick, disabled, selected, type }) => {
              return (
                <Action
                  key={id}
                  onClick={onClick}
                  className={`
                    ${selected ? 'selected' : ''}
                    ${disabled ? 'disabled' : ''}
                  `}
                  disabled={disabled}
                  value={text}
                  type={type || 'button'}
                />
              )
            }
          )}
        </ActionGroups>
      )}
    </LogWrapper>
  )
}
