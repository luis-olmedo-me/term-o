export const getSelectedText = () => {
  return window.getSelection().toString()
}

export const copyText = value => {
  navigator.clipboard.writeText(value || '')
}

export const updateUpdatesHistoryWith = (simplifiedCommands, command) => {
  const isAlreadyAdded = simplifiedCommands.some(oldCommand => oldCommand.id === command.id)

  return isAlreadyAdded
    ? simplifiedCommands.map(oldCommand =>
        oldCommand.id === command.id ? { ...oldCommand, updates: command.updates } : oldCommand
      )
    : [...simplifiedCommands, command.simplify()]
}
