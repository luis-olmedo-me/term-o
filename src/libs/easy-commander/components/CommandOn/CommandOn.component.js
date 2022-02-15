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
  parameters,
  setMessageData
}) => {
  useEffect(
    function setUpEventByURL() {
      if (!url.length) return

      backgroundRequest(eventTypes.ADD_PAGE_EVENT, {})

      backgroundRequest({
        eventType: eventTypes.ADD_PAGE_EVENT,
        data: { command: run, url: url.join('|') }
      })
    },
    [url, run]
  )

  return (
    <>
      <LogWrapper variant={parameterTypes.COMMAND}>{command}</LogWrapper>

      <LogWrapper variant={parameterTypes.INFO}>
        configuring event...
      </LogWrapper>
    </>
  )
}
