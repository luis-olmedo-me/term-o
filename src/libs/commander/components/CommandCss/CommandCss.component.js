import React, { useEffect, useState, useCallback } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { styleElements, validateStyles } from '../../commander.promises'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import {
  getActionType,
  parseManualStyles,
  parseStyles
} from './CommandCss.helpers'
import { cssMessages } from './CommandCss.messages'

export const CommandCss = ({
  props,
  terminal: { command, parameters, setMessageData }
}) => {
  const { styles, manualStyles } = props

  const [stylesApplied, setStylesApplied] = useState({})

  const actionType = getActionType(props)

  const applyStyles = useCallback(() => {
    const inlineStyles = {
      ...parseStyles(styles),
      ...parseManualStyles(manualStyles)
    }

    const hasDefaultElements = parameters?.type === parameterTypes.ELEMENTS
    const elementsToStyle = hasDefaultElements ? parameters.value : []

    const { validStyles, invalidStyles } = validateStyles(inlineStyles)

    const invalidStylesNames = Object.keys(invalidStyles)
    const hasInvalidatedStyles = invalidStylesNames.length > 0

    if (hasInvalidatedStyles) {
      return setMessageData(cssMessages.invalidStyle, {
        invalidStyleNames: invalidStylesNames.join(', ')
      })
    }

    styleElements({ styles: validStyles, elements: elementsToStyle })
    setStylesApplied(validStyles)
  }, [styles, manualStyles, setMessageData])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.SET_STYLES:
          applyStyles()
          break

        default:
          break
      }
    },
    [actionType, applyStyles]
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
