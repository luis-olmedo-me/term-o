import React, { useEffect } from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'
import { Table } from 'modules/components/Table/Table.component'

export const CommandOn = ({
  command,
  url,
  run,
  list,
  pageEvents,
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

  const pageEventsRows = pageEvents.map((pageEvent) => {
    return Object.values(pageEvent)
  })

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {hasCommandsApplied && (
        <LogWrapper variant={parameterTypes.INFO}>{label}</LogWrapper>
      )}

      {list && (
        <LogWrapper variant={parameterTypes.TABLE}>
          <Table headers={['command', 'url']} rows={pageEventsRows} />
        </LogWrapper>
      )}
    </>
  )
}
