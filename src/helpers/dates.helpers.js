import { setDigits } from './maths.helpers'
import { replace } from './utils.helpers'

export const formatDate = (date, format) => {
  const dateObject = date ? new Date(date) : new Date()

  const hh = setDigits(dateObject.getHours(), 2)
  const mm = setDigits(dateObject.getMinutes(), 2)
  const ss = setDigits(dateObject.getSeconds(), 2)
  const yyyy = setDigits(dateObject.getFullYear(), 4)
  const MM = setDigits(dateObject.getMonth() + 1, 2)
  const dd = setDigits(dateObject.getDate(), 2)

  return replace(format, { hh, ss, yyyy, dd, MM, mm })
}
