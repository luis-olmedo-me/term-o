import { messages } from '@src/constants/messages.constants'

export const renameError = error => {
  const replacement = messages.find(message => message.original.test(error))

  throw replacement ? replacement.new : error
}
