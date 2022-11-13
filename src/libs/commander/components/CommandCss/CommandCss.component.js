import * as React from 'preact'

import { useCallback, useEffect, useState } from 'preact/hooks'
import { getParamsByType } from '../../commander.helpers'
import { styleElements, validateStyles } from '../../commander.promises'
import { parameterTypes } from '../../constants/commands.constants'
import { List, StyleSheet } from '../../modules/List'
import { Log, useMessageLog } from '../../modules/Log'
import { cssActionTypes } from './CommandCss.constants'
import { getActionType, getStylesFrom, parseManualStyles, parseStyles } from './CommandCss.helpers'
import { cssMessages } from './CommandCss.messages'

export const CommandCss = ({ props, terminal: { command, params, finish } }) => {
  const [sheets, setSheets] = useState([])

  const { log: messageLog, setMessage } = useMessageLog()

  const actionType = getActionType(props)

  const handleApplyStyles = useCallback(
    (customStyles = {}) => {
      const inlineStyles = {
        ...parseStyles(props.styles),
        ...parseManualStyles(props.manualStyles),
        ...customStyles
      }

      const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

      const { validStyles, invalidStyles } = validateStyles(inlineStyles)

      const invalidStylesNames = Object.keys(invalidStyles)
      const hasInvalidatedStyles = invalidStylesNames.length > 0

      if (hasInvalidatedStyles) throw new Error('invalidStyle')

      styleElements({ styles: validStyles, elements: paramElements })
      setSheets([{ title: 'Styles', styles: validStyles }])
    },
    [props, setMessage]
  )

  const handleGetStyles = useCallback(() => {
    const paramElements = getParamsByType(parameterTypes.ELEMENTS, params)

    if (paramElements.length > 1) throw new Error('parameterOverflow')
    if (paramElements.length === 0) throw new Error('noParameters')

    const [firstParamElement] = paramElements
    const newSheets = getStylesFrom(firstParamElement)

    setSheets(newSheets)
  }, [setMessage])

  const doAction = useCallback(async () => {
    switch (actionType) {
      case cssActionTypes.SET_STYLES:
        return handleApplyStyles()

      case cssActionTypes.GET_STYLES:
        return handleGetStyles()

      case cssActionTypes.NONE:
        throw new Error('unexpectedError')
    }
  }, [actionType, handleApplyStyles, handleGetStyles])

  useEffect(
    function handleActionType() {
      const handleError = error => {
        setMessage(cssMessages[error.message] || cssMessages.unexpectedError)
        finish({ break: true })
      }

      doAction()
        .then(finish)
        .catch(handleError)
    },
    [doAction, setMessage, finish]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}

      {!messageLog && (
        <Log variant={parameterTypes.STYLES} hasScroll hasShadow>
          <List items={sheets} Child={({ item }) => <StyleSheet sheet={item} sheets={sheets} />} />
        </Log>
      )}
    </>
  )
}
