import { commandStatuses } from '@src/constants/command.constants'

import { getArgs } from './arguments.helpers'
import { getParamValue } from './options.helpers'

export const executePerUpdates = async (nextCommand, updates) => {
  const argsHoldingUp = nextCommand.args.filter(arg => arg.isHoldingUp)
  const colorPattern = /\[termo\.color\.[A-Za-z]+\]|\[termo\.bgcolor\.[A-Za-z]+\]/g

  nextCommand.allowToExecuteNext(false)

  for (let update of updates) {
    const cleanedUpdate = update.replace(colorPattern, '')
    const availableArgs = getArgs(cleanedUpdate)

    argsHoldingUp.forEach(arg => {
      const indexes = arg.getIndexes()
      const newValue = getParamValue(indexes, availableArgs)

      arg.setValue(newValue)
    })

    nextCommand.prepare()

    if (nextCommand.status === commandStatuses.ERROR) break
    await nextCommand.execute()
    nextCommand.saveUpdates()
    if (nextCommand.status === commandStatuses.ERROR) break
  }

  if (nextCommand.nextCommand && !nextCommand.failed) {
    await nextCommand.executeNext()
  }
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
