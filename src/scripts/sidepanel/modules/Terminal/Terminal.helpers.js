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

export const limitSimplifiedCommands = (commands, maxCount) => {
  let count = 0
  let newCommands = []

  for (let index = -1; index >= -1 * commands.length; index--) {
    const command = commands.at(index)
    count += command.updates.length

    if (count > maxCount) {
      newCommands = [
        { ...command, updates: command.updates.slice((maxCount - count) * -1) },
        ...newCommands
      ]
      break
    }

    newCommands = [{ ...command, updates: [...command.updates] }, ...newCommands]
  }

  return newCommands
}
