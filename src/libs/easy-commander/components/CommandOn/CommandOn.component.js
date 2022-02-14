import React from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
// import { parseStyles } from './Styler.helpers'

export const CommandOn = ({ command, parameters, setMessageData }) => {
  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.INFO}>
        configuring event...
      </LogWrapper>
    </>
  )
}
