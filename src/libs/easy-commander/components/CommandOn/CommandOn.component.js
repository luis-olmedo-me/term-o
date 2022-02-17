import React, { useEffect } from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
// import { parseStyles } from './Styler.helpers'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'

export const CommandOn = ({
  command,
  url,
  run,
  list,
  parameters,
  setMessageData
}) => {
  useEffect(
    function setUpEventByURL() {
      if (!url.length) return

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
