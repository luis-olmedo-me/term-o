import * as React from 'react'
import { parameterTypes } from '../../../../constants/commands.constants'
import { Log } from '../../Log.component'

export const MessageLog = ({ message, type }) => {
  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Log variant={type}>{message}</Log>
    </>
  )
}
