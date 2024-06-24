import { Command } from '../Command.service'

export const createClear = script => {
  return new Command({ name: 'clear', command: script, hidden: true })
}
