import { useState, useCallback } from 'react'
import { formatDate } from 'src/helpers/dates.helpers'

export const useDateRangeActions = ({ onDateUpdate }) => {
  const [dates, setDates] = useState({ start: null, end: null })
  console.log('dates', dates)
  const [areDatesInvalid, setAreDatesInvalid] = useState(false)

  const startDateAction = dates.start
    ? [
        {
          id: 'date-start-picker',
          label: formatDate(dates.start, 'dd/MM/yyyy hh:mm:ss'),
          text: formatDate(dates.start, 'yyyy-MM-ddThh:mm:ss'),
          invalid: areDatesInvalid,
          onChange: ({ target }) =>
            onDateUpdate({ startTime: new Date(target.value).getTime() }),
          type: 'datetime'
        }
      ]
    : []

  const endDateAction = dates.end
    ? [
        {
          id: 'date-end-picker',
          label: formatDate(dates.end, 'dd/MM/yyyy hh:mm:ss'),
          text: formatDate(dates.end, 'yyyy-MM-ddThh:mm:ss'),
          invalid: areDatesInvalid,
          onChange: ({ target }) =>
            onDateUpdate({ endTime: new Date(target.value).getTime() }),
          type: 'datetime'
        }
      ]
    : []

  const setDate = useCallback(
    (value) => setDates((dates) => ({ ...dates, ...value })),
    []
  )
  return {
    startDateAction,
    endDateAction,
    setAreDatesInvalid,
    setDate
  }
}
