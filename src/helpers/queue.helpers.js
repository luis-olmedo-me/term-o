export const updateQueueValueIn = (queue, commandId, newValue) => {
  return queue.map(value => (value.id === commandId ? newValue : value))
}
