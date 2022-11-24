import * as React from 'preact'

import { Error, Info, Tick } from '@src/modules/icons'
import { parameterTypes } from '../../../../constants/commands.constants'
import { CardActions } from '../CardActions/CardActions.component'
import { CardContainer, CardContent, CardScroll, CardShadow, Hash } from './LogCard.styles'

const preIconsByVariants = {
  [parameterTypes.COMMAND]: '$',
  [parameterTypes.ERROR]: <Error />,
  [parameterTypes.INFO]: <Info />,
  [parameterTypes.SUCCESS]: <Tick />
}

export const LogCard = ({ children, variant, hasScroll, hasShadow, ref, command, actions }) => {
  const icon = preIconsByVariants[variant]

  const Content = (
    <>
      {icon && <Hash>{icon}</Hash>}

      <span>{children}</span>
    </>
  )

  const hasActions = Boolean(actions?.length)

  return (
    <>
      {command && <LogCard variant={parameterTypes.COMMAND}>{command}</LogCard>}

      <CardContainer ref={ref} className={variant} onMouseDown={event => event.stopPropagation()}>
        <CardContent>
          <CardShadow className={hasShadow ? 'shadow' : ''}>
            {hasScroll ? <CardScroll>{Content}</CardScroll> : Content}
          </CardShadow>
        </CardContent>

        {hasActions && <CardActions actions={actions} />}
      </CardContainer>
    </>
  )
}
