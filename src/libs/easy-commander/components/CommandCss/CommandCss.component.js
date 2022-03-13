import React, { useEffect, useState } from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { styleElements, validateStyles } from '../../easyCommander.promises'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { parseManualStyles, parseStyles } from './CommandCss.helpers'

export const CommandCss = ({
  props: { styles, manualStyles },
  command,
  parameters,
  setMessageData
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
        const stringifiedInvalidatedStyles = invalidStylesNames.join(', ')
        const message = `Some of the styles you provided are invalid: "${stringifiedInvalidatedStyles}".`

        return setMessageData({ message, type: parameterTypes.ERROR })
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
