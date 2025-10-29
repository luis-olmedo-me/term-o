export const updateQueueValueIn = (queue, queueId, command) => {
  return queue.map(value => (value.id === queueId ? { ...value, command } : value))
}
