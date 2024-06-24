import { Command } from '../command.service'

export const createClear = script => {
  return new Command({ name: 'clear', command: script, hidden: true })
}
