export const updateQueueValueIn = (queue, queueId, newValue) => {
  return queue.map(value => (value.id === queueId ? newValue : value))
}
