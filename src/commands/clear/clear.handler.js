export const clearHandler = async command => {
  const { clearLogs } = command.data

  clearLogs()
  command.hide()
}
