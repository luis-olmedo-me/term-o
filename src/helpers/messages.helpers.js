import { messages } from '@src/constants/messages.constants'

export const overwriteMessage = value => {
  const replacement = messages.find(message => message.original.test(value))

  return replacement ? replacement.new : value
}

export const overwriteError = value => {
  throw overwriteMessage(value)
}

export const preAppendCounters = array => {
  const counters = array.reduce((results, value) => {
    const oldValue = results[value] || 0

    return { ...results, [value]: oldValue + 1 }
  }, {})

  return Object.entries(counters).map(([value, count]) => `${count} ${value}`)
}
