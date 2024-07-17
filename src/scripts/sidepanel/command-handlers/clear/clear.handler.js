export const handleCLEAR = async command => {
  const { clearLogs } = command.data

  clearLogs()
}
