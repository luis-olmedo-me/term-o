import React, { useEffect } from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'
import { eventRows } from './CommandEvent.constants'

export const CommandEvent = ({
  command,
  list,
  pageEvents,
  parameters,
  setMessageData
}) => {
  const pageEventsRows = pageEvents.map((pageEvent) => {
    return eventRows.map((eventRow) => pageEvent[eventRow])
  })

  const hasPageEvents = pageEvents.length > 0

  useEffect(
    function handleEmptyPageEvents() {
      if (hasPageEvents || !list) return

      setMessageData({
        type: parameterTypes.INFO,
        message: 'There are no page events registered.'
      })
    },
    [hasPageEvents, list]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {list && (
        <LogWrapper variant={parameterTypes.TABLE}>
          <Table headers={eventRows} rows={pageEventsRows} />
        </LogWrapper>
      )}
    </>
  )
}
