export const clearHandler = async command => {
  command.queue.clearCompleted()
  command.hide()
}
