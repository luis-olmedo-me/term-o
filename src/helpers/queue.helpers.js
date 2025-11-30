import { formatWarning } from './format.helpers'

export const updateQueueValueIn = (queue, queueId, command) => {
  return queue.map(value => (value.id === queueId ? { ...value, command } : value))
}

export const limitQueueByConfig = (queue, maxCount) => {
  let count = 0
  let newQueue = []

  for (let index = -1; index >= -1 * queue.length; index--) {
    const queueItem = queue.at(index)
    const command = queueItem.command

    if (!command) {
      newQueue.unshift(queueItem)
      continue
    }
    const updates = command.updates
    let warning = null

    count += updates.length

    if (count > maxCount) {
      const cutUpdates = updates.slice((maxCount - count) * -1)
      const overflowCount = updates.length - cutUpdates.length
      warning = formatWarning({
        title: `Command line limit exceeded. Discarded ${overflowCount} lines.`
      })

      newQueue.unshift({ ...queueItem, command: { ...command, warning, updates: cutUpdates } })
      break
    }

    newQueue.unshift({ ...queueItem, command: { ...command, warning } })
  }

  return newQueue
}
