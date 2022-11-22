import * as React from 'preact'
import { parameterTypes } from '../../../../constants/commands.constants'
import { LogContainer } from '../../Log.styles'
import LogCard from '../LogCard'

export const MessageLog = ({ message, type, command }) => {
  return (
    <LogContainer>
      <LogCard variant={type} command={command}>
        {message}
      </LogCard>
    </LogContainer>
  )
}
