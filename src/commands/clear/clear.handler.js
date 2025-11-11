import { origins } from '@src/constants/command.constants'

export const clearHandler = async command => {
  if (command.origin !== origins.MANUAL)
    throw 'Clearing the terminal is only allowed through direct user interaction.'

  command.queue.clearCompleted()
  command.hide()
}
