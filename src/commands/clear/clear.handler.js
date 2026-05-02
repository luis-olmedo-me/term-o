import { origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'

export const clearHandler = async command => {
  const origin = command.get('origin')
  const storage = command.get('storage')
  const commandList = command.get('commandList')

  if (origin !== origins.MANUAL)
    throw 'Clearing the terminal is only allowed through direct user interaction.'

  const queue = storage.get(storageKeys.COMMAND_QUEUE)

  commandList.hideUntil(command.id)
  queue.clearCompleted()
}
