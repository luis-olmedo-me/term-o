import { errorMessagesOverwritten } from './command-helpers.constants'

export const prependCounters = array => {
  const counters = array.reduce((results, value) => {
    const oldValue = results[value] || 0

    return { ...results, [value]: oldValue + 1 }
  }, {})

  return Object.entries(counters).map(([value, count]) => `${count} ${value}`)
}

export const renameError = error => {
  const replacement = errorMessagesOverwritten.find(message => message.original.test(error))

  throw replacement ? replacement.new : error
}
