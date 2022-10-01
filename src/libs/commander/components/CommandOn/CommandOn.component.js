import * as React from 'react'
import { useEffect, useCallback } from 'react'
import {
  customPageEventNames,
  parameterTypes
} from '../../constants/commands.constants'
import { Log } from '../../modules/Log'
import { addPageEvents } from 'src/helpers/event.helpers.js'
import { checkIfRegExpIsValid, getActionType } from './CommandOn.helpers'
import { onMessages } from './CommandOn.messages'
import { onActionTypes } from './CommandOn.constants'

export const CommandOn = ({
  props,
  terminal: { command, setMessageData, finish }
}) => {
  const { url, run, event } = props

  const actionType = getActionType(props)

  const handleAddEvent = useCallback(() => {
    if (!run.length) return setMessageData(onMessages.missingCommand)

    const areURLsValid = url.every(checkIfRegExpIsValid)

    if (!areURLsValid) {
      return setMessageData(onMessages.invalidURLRegularExpressions)
    }

    if (event && !customPageEventNames.includes(event)) {
      return setMessageData(onMessages.invalidEventType)
    }

    const urlForEvent = url.join('|')
    const commandsToRun = run.map((commandToRun) => {
      return { command: commandToRun, url: urlForEvent, event }
    })

    addPageEvents(commandsToRun)
      .catch(() => setMessageData(onMessages.unexpectedError))
      .then(() => setMessageData(onMessages.eventSaveSuccess))
      .then(() => finish())
  }, [url, run, setMessageData, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case onActionTypes.ADD_EVENT:
          handleAddEvent()
          break

        case onActionTypes.NONE:
          setMessageData(onMessages.unexpectedError)
          break
      }
    },
    [actionType, handleAddEvent, setMessageData]
  )

  return <Log variant={parameterTypes.COMMAND}>{command}</Log>
}
