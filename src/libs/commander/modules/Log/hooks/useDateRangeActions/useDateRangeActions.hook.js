import { formatDate } from '@src/helpers/dates.helpers'
import { useCallback, useState } from 'preact/hooks'

export const useDateRangeActions = ({ onDateUpdate }) => {
  const [dates, setDates] = useState({ start: null, end: null })
  const [areDatesInvalid, setAreDatesInvalid] = useState(false)

  const startDateAction = dates.start
    ? [
        {
          id: 'date-start-picker',
          title: 'Start date',
          label: formatDate(dates.start, 'ddbb'),
          text: formatDate(dates.start, 'yyyy-MM-ddThh:mm:ss'),
          invalid: areDatesInvalid,
          onChange: ({ target }) => onDateUpdate({ startTime: new Date(target.value).getTime() }),
          type: 'datetime'
        },
        {
          id: 'range-symbol',
          text: '➜',
          type: 'symbol'
        },
        {
          id: 'date-end-picker',
          title: 'End date',
          label: formatDate(dates.end, 'ddbb'),
          text: formatDate(dates.end, 'yyyy-MM-ddThh:mm:ss'),
          invalid: areDatesInvalid,
          onChange: ({ target }) => onDateUpdate({ endTime: new Date(target.value).getTime() }),
          type: 'datetime'
        }
      ]
    : []

  const endDateAction = dates.end ? [] : []

  const setDate = useCallback(value => setDates(dates => ({ ...dates, ...value })), [])
  return {
    startDateAction,
    endDateAction,
    setAreDatesInvalid,
    setDate
  }
}
