import React from 'react'
import { Log } from '../Log/Log.component'
import { parameterTypes } from '../../constants/commands.constants'

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
