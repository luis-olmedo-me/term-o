import { helpActionTypes } from './CommandHelp.constants'

export const getActionType = ({ about }) => {
  if (about.length) return helpActionTypes.HELP
  else return helpActionTypes.NONE
}

export const getItemsFromProps = ({ props }) => {
  return Object.entries(props).map(([propName, propConfig]) => {
    return {
      id: propConfig.key,
      text: `--${propName} <${propConfig.type}> - ${propConfig.description}`
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
      commandData
        ? { ...commonProps, items: getItemsFromProps({ props }) }
        : { ...commonProps, warning: 'Command not found' }
    ]
  }, [])
}
