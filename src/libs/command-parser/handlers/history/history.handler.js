import { displayHelp, formatHistoryItem } from '../handlers.helpers'

export const handleHistory = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const titlePattern = P`title` && new RegExp(P`title`)

    const history = await chrome.history.search({ text: '', maxResults: 1000 })
    const historyFiltered = history.filter(historyItem => {
      let validations = []

      if (P`title`) validations.push(() => titlePattern.test(historyItem.title))

      return validations.every(validation => validation())
    })

    const updates = historyFiltered.map(formatHistoryItem)

    command.update(...updates)
  }

  if (P`help`) displayHelp(command)
}
