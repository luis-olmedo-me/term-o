import { getArgs } from './sub-services/command/command.helpers'

export const splitBy = (value, key) => {
  const fragments = getArgs(value)

  let output = []
  let outputIndex = 0
  const addFragment = fragment => {
    const carried = output[outputIndex]

    output[outputIndex] = carried ? `${carried} ${fragment}` : fragment
  }

  for (let index = 0; index < fragments.length; index++) {
    const fragment = fragments[index]
    const isKey = fragment === key

    if (isKey) {
      outputIndex++
      continue
    }

    addFragment(fragment)
  }

  return output
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

export const updateSimplifiedCommandsWith = (simplifiedCommands, command) => {
  const isAlreadyAdded = simplifiedCommands.some(oldCommand => oldCommand.id === command.id)

  return isAlreadyAdded
    ? simplifiedCommands.map(oldCommand =>
        oldCommand.id === command.id ? { ...oldCommand, updates: command.updates } : oldCommand
      )
    : [...simplifiedCommands, command.simplify()]
}
