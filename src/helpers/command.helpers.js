import { statuses } from '@src/templates/Command'
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

    if (nextCommand.status === statuses.ERROR) break
    await nextCommand.execute()
    nextCommand.saveUpdates()
    if (nextCommand.status === statuses.ERROR) break
  }

  if (nextCommand.nextCommand && !nextCommand.failed) {
    await nextCommand.executeNext()
  }
}
