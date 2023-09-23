import { monthNames } from 'constants/Dates.constants'
import { setDigits } from './maths.helpers'
import { replace } from './utils.helpers'

export const formatDate = (date, format) => {
  const dateObject = date ? new Date(date) : new Date()
  const month = dateObject.getMonth()

  const hh = setDigits(dateObject.getHours(), 2)
  const mm = setDigits(dateObject.getMinutes(), 2)
  const ss = setDigits(dateObject.getSeconds(), 2)
  const yyyy = setDigits(dateObject.getFullYear(), 4)
  const MM = setDigits(month + 1, 2)
  const bb = monthNames[month].charAt(0)
  const dd = setDigits(dateObject.getDate(), 2)

  return replace(format, { hh, ss, yyyy, dd, MM, mm, bb })
}
