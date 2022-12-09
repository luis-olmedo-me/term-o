import { kebabize } from 'libs/commander/commander.promises'
import { consoleCommands } from '../../commander.constants'
import { helpActionTypes } from './CommandHelp.constants'

export const getActionType = ({ about }) => {
  if (about.length) return helpActionTypes.HELP
  else return helpActionTypes.NONE
}

export const getItemsFromProps = ({ props }) => {
  return props.map(propConfig => {
    const propName = kebabize(propConfig.key)

    return {
      id: propConfig.key,
      title: `--${propName} <${propConfig.type}>`,
      description: propConfig.description
    }
  })
}

export const getMessagesFromCommandsToCheck = ({ commands }) => {
  return commands.reduce((messages, commandToHelpWith) => {
    const knownCommand = consoleCommands[commandToHelpWith]
    const { props } = knownCommand || {}

    const commonProps = {
      id: commandToHelpWith,
      title: commandToHelpWith
    }

    return [
      ...messages,
      knownCommand
        ? { ...commonProps, items: getItemsFromProps({ props }) }
        : { ...commonProps, warning: 'Command not found' }
    ]
  }, [])
}
