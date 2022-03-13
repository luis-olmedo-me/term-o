import React, { useEffect } from 'react'
import { parameterTypes } from '../../constants/commands.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { checkIfRegExpIsValid } from './CommandOn.helpers'

export const CommandOn = ({ command, props: { url, run }, setMessageData }) => {
  useEffect(
    function setUpEventByURL() {
      if (!url.length) return
      if (!run.length) {
        return setMessageData({
          message: 'Must provide a command to run',
          type: parameterTypes.ERROR
        })
      }

      const areURLsValid = checkIfRegExpIsValid(url)

      if (!areURLsValid) {
        return setMessageData({
          message: 'URLs must be valid regular expressions',
          type: parameterTypes.ERROR
        })
      }

      const urlForEvent = url.join('|')
      const commandsToRun = run.map((commandToRun) => {
        return { command: commandToRun, url: urlForEvent }
      })

      backgroundRequest({
        eventType: eventTypes.ADD_PAGES_EVENT,
        data: commandsToRun
      })
    },
    [url, run]
  )

  const hasCommandsApplied = run.length > 0
  const urlsApplied = url.includes('.') ? 'ANY' : `"${url.join('", "')}"`
  const commandsApplied = `"${run.join('", "')}"`

  const label = `Set ${commandsApplied} to run on ${urlsApplied} urls.`

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {hasCommandsApplied && (
        <LogWrapper variant={parameterTypes.INFO}>{label}</LogWrapper>
      )}
    </>
  )
}
