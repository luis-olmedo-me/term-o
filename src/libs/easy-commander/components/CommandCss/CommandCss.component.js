import React, { useEffect, useState } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { styleElements, validateStyles } from '../../easyCommander.promises'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { parseManualStyles, parseStyles } from './CommandCss.helpers'
import { cssMessages } from './CommandCss.messages'

export const CommandCss = ({
  props: { styles, manualStyles },
  terminal: { command, parameters, setMessageData }
}) => {
  const [stylesApplied, setStylesApplied] = useState({})
  const inlineStyles = {
    ...parseStyles(styles),
    ...parseManualStyles(manualStyles)
  }

  useEffect(
    function applyStyles() {
      const hasDefaultElements = parameters?.type === parameterTypes.ELEMENTS
      const elementsToStyle = hasDefaultElements ? parameters.value : []

      const { validStyles, invalidStyles } = validateStyles(inlineStyles)

      const invalidStylesNames = Object.keys(invalidStyles)
      const hasInvalidatedStyles = invalidStylesNames.length > 0

      if (!hasInvalidatedStyles) {
        styleElements({ styles: validStyles, elements: elementsToStyle })
        setStylesApplied(validStyles)
      } else {
        setMessageData(cssMessages.invalidStyle, {
          invalidStyleNames: invalidStylesNames.join(', ')
        })
      }
    },
    [parameters]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.STYLES}>
        {JSON.stringify(stylesApplied, null, 1)}
      </LogWrapper>
    </>
  )
}
