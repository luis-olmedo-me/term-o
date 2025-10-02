import { errorMessagesOverwritten } from './processes.constants'

export const getErrorMessage = error => {
  const replacement = errorMessagesOverwritten.find(message => message.original === error)

  return replacement ? replacement.new : error
}
