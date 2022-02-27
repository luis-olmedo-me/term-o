import { useEffect, useState } from 'react'

import { backgroundRequest } from 'src/helpers/event.helpers.js'
import { eventTypes } from 'src/constants/events.constants.js'

export const usePageEvents = () => {
  const [pageEvents, setPageEvents] = useState([])
  const [appliedPageEvents, setAppliedPageEvents] = useState([])

  useEffect(function getPageEvents() {
    const receivePageEvents = ({ response: newPageEvents }) => {
      const newAppliedPageEvents = newPageEvents.filter((pageEvent) => {
        return window.location.origin.match(new RegExp(pageEvent.url))
      })

      setPageEvents(newPageEvents)
      setAppliedPageEvents(newAppliedPageEvents)
    }

    backgroundRequest({
      eventType: eventTypes.GET_PAGE_EVENTS,
      callback: receivePageEvents
    })
  }, [])

  return { pageEvents, appliedPageEvents }
}
