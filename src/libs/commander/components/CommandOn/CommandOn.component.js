import React, { useEffect, useCallback } from 'react'
import { actionTypes, parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { checkIfRegExpIsValid, getActionType } from './CommandOn.helpers'
import { onMessages } from './CommandOn.messages'

export const CommandOn = ({ props, terminal: { command, setMessageData } }) => {
  const { url, run } = props

  const actionType = getActionType(props)

  const handleAddEvent = useCallback(() => {
    if (!url.length) return
    if (!run.length) return setMessageData(onMessages.missingCommand)

    const areURLsValid = url.every(checkIfRegExpIsValid)

    if (!areURLsValid) {
      return setMessageData(onMessages.invalidURLRegularExpressions)
    }

    const urlForEvent = url.join('|')
    const commandsToRun = run.map((commandToRun) => {
      return { command: commandToRun, url: urlForEvent }
    })

    backgroundRequest({
      eventType: eventTypes.ADD_PAGES_EVENT,
      data: commandsToRun
    })

    setMessageData(onMessages.eventSaveSuccess)
  }, [url, run, setMessageData])

  useEffect(
    function handleActionType() {
      switch (actionType) {
        case actionTypes.ADD_EVENT:
          handleAddEvent()
          break

        default:
          break
      }
    },
    [actionType, handleAddEvent]
  )

  return <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>
}
