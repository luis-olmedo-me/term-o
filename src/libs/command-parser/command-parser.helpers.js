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

export const updateSimplifiedCommandsWith = (simplifiedCommands, command, commandId) => {
  if (!command) return simplifiedCommands

  const isAlreadyAdded = simplifiedCommands.some(oldCommand => oldCommand.id === commandId)

  return isAlreadyAdded
    ? simplifiedCommands.map(oldCommand =>
        oldCommand.id === commandId
          ? { ...oldCommand, updates: command.updates, status: command.status }
          : oldCommand
      )
    : [...simplifiedCommands, command.simplify()]
}
