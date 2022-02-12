import React from 'react'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { parameterTypes } from '../../easyCommander.constants'

export const ErrorCommand = ({ errorMessage, command }) => {
  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.ERROR}>{errorMessage}</LogWrapper>
    </>
  )
}
