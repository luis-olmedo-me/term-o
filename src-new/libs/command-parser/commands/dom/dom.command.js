import { commandNames } from '../command.constants'
import { Command } from '../command.service'

export const createDOM = (script, handler) => {
  return new Command({
    name: commandNames.DOM,
    command: script
  }).setHandler(handler)
}
