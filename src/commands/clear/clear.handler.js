import { storageKeys } from '@src/constants/storage.constants'
import storage from '@src/libs/storage'

export const clearHandler = async command => {
  const queue = storage.get(storageKeys.COMMAND_QUEUE)

  queue.clearCompleted()
  command.hide()
}
