import React, { useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { checkIfRegExpIsValid } from './CommandOn.helpers'
import { onMessages } from './CommandOn.messages'

export const CommandOn = ({
  props: { url, run },
  terminal: { command, setMessageData }
}) => {
  useEffect(
    function setUpEventByURL() {
      if (!url.length) return
      if (!run.length) return setMessageData(onMessages.missingCommand)

      const areURLsValid = checkIfRegExpIsValid(url)

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
    },
    [url, run]
  )

  return <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>
}
