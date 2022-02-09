import React, { useEffect } from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { styleElements } from '../../easyCommander.promises'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { parseStyles } from './Styler.helpers'

export const Styler = ({ id, styles, command, parameters }) => {
  const inlineStyles = parseStyles(styles)

  useEffect(
    function applyStyles() {
      const hasDefaultElements = parameters?.type === parameterTypes.ELEMENTS
      const elementsToStyle = hasDefaultElements ? parameters.value : []

      styleElements({ styles: inlineStyles, elements: elementsToStyle })
    },
    [parameters]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.STYLES}>
        {JSON.stringify(inlineStyles, null, 1)}
      </LogWrapper>
    </>
  )
}
