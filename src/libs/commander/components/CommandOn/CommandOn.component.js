import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { addPageEvents } from 'src/helpers/event.helpers.js'
import { generateUUID } from 'src/helpers/utils.helpers'
import {
  customPageEventNames,
  parameterTypes
} from '../../constants/commands.constants'
import { Log, useMessageLog } from '../../modules/Log'
import { onActionTypes } from './CommandOn.constants'
import { checkIfRegExpIsValid, getActionType } from './CommandOn.helpers'
import { onMessages } from './CommandOn.messages'

export const CommandOn = ({ props, terminal: { command, finish } }) => {
  const { url, run, event } = props

  const actionType = getActionType(props)

  const { log: messageLog, setMessage } = useMessageLog()

  const handleAddEvent = useCallback(() => {
    if (!run.length) return setMessage(onMessages.missingCommand)

    const areURLsValid = url.every(checkIfRegExpIsValid)

    if (!areURLsValid) {
      return setMessage(onMessages.invalidURLRegularExpressions)
    }

    if (event && !customPageEventNames.includes(event)) {
      return setMessage(onMessages.invalidEventType)
    }

    const urlForEvent = url.join('|')
    const commandsToRun = run.map((commandToRun) => {
      return {
        id: generateUUID(),
        command: commandToRun,
        url: urlForEvent,
        event
      }
    })

    addPageEvents(commandsToRun)
      .catch(() => setMessage(onMessages.unexpectedError))
      .then(() => setMessage(onMessages.eventSaveSuccess))
      .then(() => finish())
  }, [url, run, setMessage, finish])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case onActionTypes.ADD_EVENT:
          handleAddEvent()
          break

        case onActionTypes.NONE:
          setMessage(onMessages.unexpectedError)
          break
      }
    },
    [actionType, handleAddEvent, setMessage]
  )

  return (
    <>
      <Log variant={parameterTypes.COMMAND}>{command}</Log>

      {messageLog && <Log variant={messageLog.type}>{messageLog.message}</Log>}
    </>
  )
}
