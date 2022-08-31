import React, { useEffect, useCallback } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { addPageEvents } from 'src/helpers/event.helpers.js'
import { checkIfRegExpIsValid, getActionType } from './CommandOn.helpers'
import { onMessages } from './CommandOn.messages'
import { supportedEvents, onActionTypes } from './CommandOn.constants'

export const CommandOn = ({ props, terminal: { command, setMessageData } }) => {
  const { url, run, event } = props

  const actionType = getActionType(props)

  const handleAddEvent = useCallback(() => {
    if (!run.length) return setMessageData(onMessages.missingCommand)

    const areURLsValid = url.every(checkIfRegExpIsValid)

    if (!areURLsValid) {
      return setMessageData(onMessages.invalidURLRegularExpressions)
    }

    if (event && !supportedEvents.includes(event)) {
      return setMessageData(onMessages.invalidEventType)
    }

    const urlForEvent = url.join('|')
    const commandsToRun = run.map((commandToRun) => {
      return { command: commandToRun, url: urlForEvent, event }
    })

    addPageEvents(commandsToRun)
      .catch(() => setMessageData(onMessages.unexpectedError))
      .then(() => setMessageData(onMessages.eventSaveSuccess))
  }, [url, run, setMessageData])

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

  return <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>
}
