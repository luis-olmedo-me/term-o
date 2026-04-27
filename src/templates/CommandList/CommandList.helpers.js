import { commandStatuses } from '@src/constants/command.constants'

const commandIs = (command, status) => command.status === status
const commandsHaveSome = (commands, status) => commands.some(command => commandIs(command, status))
const commandsHaveAll = (commands, status) => commands.every(command => commandIs(command, status))

export const getCommandListStatus = commands => {
  if (commandsHaveSome(commands, commandStatuses.ERROR)) return commandStatuses.ERROR
  if (commandsHaveSome(commands, commandStatuses.EXECUTING)) return commandStatuses.EXECUTING
  if (commandsHaveAll(commands, commandStatuses.DONE)) return commandStatuses.DONE
  if (commandsHaveSome(commands, commandStatuses.IDLE)) return commandStatuses.IDLE
  return commandStatuses.EXECUTING
}
