import { Command } from '../Command.service'

export const createClear = script => {
  return new Command('clear', script)
}
