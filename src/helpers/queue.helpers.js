export const updateQueueValueIn = (queue, queueId, command) => {
  return queue.map(value => (value.id === queueId ? { ...value, command } : value))
}

export const limitQueueByConfig = (queue, maxCount) => {
  let count = 0
  let discardedCount = 0
  let alreadyExceed = false
  let newQueue = []

  for (let index = -1; index >= -1 * queue.length; index--) {
    const queueItem = queue.at(index)
    const command = queueItem.command

    if (!command) {
      newQueue.unshift(queueItem)
      continue
    }
    const updates = command.updates

    count += updates.length

    if (count > maxCount) {
      const cutUpdates = updates.slice((maxCount - count) * -1)
      const overflowCount = updates.length - cutUpdates.length

      if (overflowCount) discardedCount += overflowCount
      if (alreadyExceed) {
        discardedCount += updates.length
        continue
      }
      newQueue.unshift({ ...queueItem, command: { ...command, updates: cutUpdates } })
      alreadyExceed = true
      continue
    }

    newQueue.unshift({ ...queueItem, command })
  }

  return [newQueue, discardedCount]
}
