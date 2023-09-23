import { formatDate } from '@src/helpers/dates.helpers'
import { useCallback, useState } from 'preact/hooks'
import { cardActionTypes } from '../../components/CardActions/CardActions.constants'

export const useDateRangeActions = ({ onDateUpdate }) => {
  const [dates, setDates] = useState({ start: null, end: null })
  const [areDatesInvalid, setAreDatesInvalid] = useState(false)

  const dateActions =
    dates.start && dates.end
      ? [
          {
            id: 'date-start-picker',
            title: 'Start date',
            label: formatDate(dates.start, 'ddbb'),
            text: formatDate(dates.start, 'yyyy-MM-ddThh:mm:ss'),
            invalid: areDatesInvalid,
            onChange: ({ target }) => onDateUpdate({ startTime: new Date(target.value).getTime() }),
            type: cardActionTypes.DATE_TIME
          },
          {
            id: 'range-symbol',
            text: '➜',
            type: cardActionTypes.SYMBOL
          },
          {
            id: 'date-end-picker',
            title: 'End date',
            label: formatDate(dates.end, 'ddbb'),
            text: formatDate(dates.end, 'yyyy-MM-ddThh:mm:ss'),
            invalid: areDatesInvalid,
            onChange: ({ target }) => onDateUpdate({ endTime: new Date(target.value).getTime() }),
            type: cardActionTypes.DATE_TIME
          }
        ]
      : []

  const setDate = useCallback(value => setDates(dates => ({ ...dates, ...value })), [])

  return {
    dateActions,
    setAreDatesInvalid,
    setDate
  }
}
