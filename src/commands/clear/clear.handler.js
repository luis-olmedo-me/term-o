export default async command => {
  const { clearLogs } = command.data

  clearLogs()
  command.hide()
}
