import { displayHelp, formatHistoryItem } from '../handlers.helpers'

export const handleHistory = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const history = await chrome.history.search({ text: '', maxResults: 1000 })
    const updates = history.map(formatHistoryItem)

    command.update(...updates)
  }

  if (P`help`) displayHelp(command)
}
