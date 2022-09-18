import React from 'react'
import { parameterTypes } from '../../../../constants/commands.constants'
import { Log } from '../../Log.component'

export const MessageCommand = ({
  terminal: {
    messageData: { message, type },
    command
  }
}) => {
  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Log variant={type}>{message}</Log>
    </>
  )
}
