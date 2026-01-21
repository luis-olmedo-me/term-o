import { messages } from '@src/constants/messages.constants'

export const overwriteMessage = value => {
  const replacement = messages.find(message => message.original.test(value))

  return replacement ? replacement.new : value
}

export const overwriteError = value => {
  throw overwriteMessage(value)
}
