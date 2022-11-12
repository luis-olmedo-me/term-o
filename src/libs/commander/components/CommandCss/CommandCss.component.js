import * as React from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { getParamsByType } from '../../commander.helpers'
import { styleElements, validateStyles } from '../../commander.promises'
import { parameterTypes } from '../../constants/commands.constants'
import { List, StyleSheet } from '../../modules/List'
import { Log, useMessageLog } from '../../modules/Log'
import { cssActionTypes } from './CommandCss.constants'
import {
  getActionType,
  getStylesFrom,
  parseManualStyles,
  parseStyles
} from './CommandCss.helpers'
import { cssMessages } from './CommandCss.messages'

export const CommandCss = ({
  props,
  terminal: { command, params, finish }
}) => {
  const [sheets, setSheets] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()

  const actionType = getActionType(props)
  const { styles, manualStyles } = props

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
        return setMessage(cssMessages.invalidStyle, {
          invalidStyleNames: invalidStylesNames.join(', ')
        })
      }

      styleElements({ styles: validStyles, elements: paramElements })
      setSheets([{ title: 'Styles', styles: validStyles }])
      finish()
    },
    [styles, manualStyles, setMessage, finish]
  )

  const handleGetStyles = useCallback(() => {
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (paramElements.length > 1)
      return setMessage(cssMessages.parameterOverflow)
    if (paramElements.length === 0) return setMessage(cssMessages.noParameters)

    const [firstParamElement] = paramElements
    const newSheets = getStylesFrom(firstParamElement)

    setSheets(newSheets)
    finish()
  }, [setMessage, finish])

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
          setMessage(cssMessages.unexpectedError)
          break
      }
    },
    [actionType, handleApplyStyles, handleGetStyles, setMessage]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Log variant={parameterTypes.STYLES} hasScroll hasShadow>
          <List
            items={sheets}
            Child={({ item }) => <StyleSheet sheet={item} sheets={sheets} />}
          />
        </Log>
      )}
    </>
  )
}
