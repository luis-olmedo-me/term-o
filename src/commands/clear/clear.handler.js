import { origins } from '@src/constants/command.constants'
import { storageKeys } from '@src/constants/storage.constants'

export const clearHandler = async command => {
  if (command.origin !== origins.MANUAL)
    throw 'Clearing the terminal is only allowed through direct user interaction.'

  const storage = command.get('storage')
  const queue = storage.get(storageKeys.COMMAND_QUEUE)

  queue.clearCompleted()
  command.hide()
}
