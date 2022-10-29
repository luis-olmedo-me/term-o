import * as React from 'react'
import { useEffect, useState } from 'react'
import { Command } from 'src/modules/icons/Command.icon'
import { Error } from 'src/modules/icons/Error.icon'
import { Info } from 'src/modules/icons/Info.icon'
import { Tick } from 'src/modules/icons/Tick.icon'
import { parameterTypes } from '../../constants/commands.constants'
import { ActionGroups } from './components/ActionGroups/ActionGroups.component'
import {
  AnimatedLoader,
  Hash,
  LoaderText,
  LogContent,
  LogWrapper,
  ScrolledLogContent
} from './Log.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '$',
  [parameterTypes.ERROR]: <Error />,
  [parameterTypes.INFO]: <Info />,
  [parameterTypes.SUCCESS]: <Tick />
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

      <span>{children}</span>
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

      {hasActionGroups && <ActionGroups actionGroups={actionGroups} />}
    </LogWrapper>
  )
}
