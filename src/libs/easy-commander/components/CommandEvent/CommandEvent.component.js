import React from 'react'
import { parameterTypes } from '../../easyCommander.constants'
import { LogWrapper } from '../LogWrapper/LogWrapper.component'
import { Table } from 'modules/components/Table/Table.component'

export const CommandEvent = ({
  command,
  list,
  pageEvents,
  parameters,
  setMessageData
}) => {
  const pageEventsRows = pageEvents.map((pageEvent) => {
    return Object.values(pageEvent)
  })

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      {list && (
        <LogWrapper variant={parameterTypes.TABLE}>
          <Table headers={['command', 'url']} rows={pageEventsRows} />
        </LogWrapper>
      )}
    </>
  )
}
