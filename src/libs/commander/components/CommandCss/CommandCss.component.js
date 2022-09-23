import React, { useEffect, useState, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { styleElements, validateStyles } from '../../commander.promises'
import { getParamsByType } from '../../commander.helpers'
import { Log } from '../../modules/Log'
import {
  getActionType,
  getStylesFrom,
  parseManualStyles,
  parseStyles
} from './CommandCss.helpers'
import { cssMessages } from './CommandCss.messages'
import { List, StyleSheet } from '../../modules/List'
import { cssActionTypes } from './CommandCss.constants'

export const CommandCss = ({
  props,
  terminal: { command, params, setMessageData, finish }
}) => {
  const { styles, manualStyles } = props

  const [sheets, setSheets] = useState([])

  const actionType = getActionType(props)

  const handleApplyStyles = useCallback(
    (customStyles = {}) => {
      const inlineStyles = {
        ...parseStyles(styles),
        ...parseManualStyles(manualStyles),
        ...customStyles
      }

      const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

      const { validStyles, invalidStyles } = validateStyles(inlineStyles)

      const invalidStylesNames = Object.keys(invalidStyles)
      const hasInvalidatedStyles = invalidStylesNames.length > 0

      if (hasInvalidatedStyles) {
        return setMessageData(cssMessages.invalidStyle, {
          invalidStyleNames: invalidStylesNames.join(', ')
        })
      }

      styleElements({ styles: validStyles, elements: paramElements })
      setSheets([{ title: 'Styles', styles: validStyles }])
      finish()
    },
    [styles, manualStyles, setMessageData, finish]
  )

  const handleGetStyles = useCallback(() => {
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (paramElements.length > 1)
      return setMessageData(cssMessages.parameterOverflow)
    if (paramElements.length === 0)
      return setMessageData(cssMessages.noParameters)

    const [firstParamElement] = paramElements
    const newSheets = getStylesFrom(firstParamElement)

    setSheets(newSheets)
    finish()
  }, [setMessageData, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case cssActionTypes.SET_STYLES:
          handleApplyStyles()
          break

        case cssActionTypes.GET_STYLES:
          handleGetStyles()
          break

        case cssActionTypes.NONE:
          setMessageData(cssMessages.unexpectedError)
          break
      }
    },
    [actionType, handleApplyStyles, handleGetStyles]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      <Log variant={parameterTypes.STYLES}>
        <List
          items={sheets}
          Child={({ item }) => <StyleSheet sheet={item} sheets={sheets} />}
        />
      </Log>
    </>
  )
}
