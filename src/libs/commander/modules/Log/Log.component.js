import * as React from 'preact'
import { Error, Info, Tick } from 'src/modules/icons'
import { parameterTypes } from '../../constants/commands.constants'
import { ActionGroups } from './components/ActionGroups/ActionGroups.component'
import {
  Hash,
  LogContent,
  LogWrapper,
  ScrolledLogContent,
  Shadow
} from './Log.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '$',
  [parameterTypes.ERROR]: <Error />,
  [parameterTypes.INFO]: <Info />,
  [parameterTypes.SUCCESS]: <Tick />
}

export const Log = ({
  children,
  variant,
  actionGroups,
  hasScroll,
  hasShadow
}) => {
  const icon = preIconsByVariants[variant]

  const hasActionGroups = Boolean(actionGroups?.length)

  const Content = (
    <>
      {icon && <Hash>{icon}</Hash>}

      <span>{children}</span>
    </>
  )

  return (
    <LogWrapper
      className={variant}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <LogContent>
        <Shadow className={hasShadow ? 'shadow' : ''}>
          {hasScroll ? (
            <ScrolledLogContent>{Content}</ScrolledLogContent>
          ) : (
            Content
          )}
        </Shadow>
      </LogContent>

      {hasActionGroups && <ActionGroups actionGroups={actionGroups} />}
    </LogWrapper>
  )
}
