import React from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { parameterTypes } from '../../easyCommander.constants'

export const MessageCommand = ({ messageData: { message, type }, command }) => {
  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={type}>{message}</LogWrapper>
    </>
  )
}
