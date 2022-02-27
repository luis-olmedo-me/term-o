import React from 'react'
import { parameterTypes } from '../../easyCommander.constants'

export const CommandClear = ({ command }) => {
  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.SUCCESS}>clearing...</LogWrapper>
    </>
  )
}
