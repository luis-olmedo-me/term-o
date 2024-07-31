import { displayHelp, formatHistoryItem } from '../handlers.helpers'

export const handleHistory = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const titlePattern = P`title` && new RegExp(P`title`)
    const urlPattern = P`url` && new RegExp(P`url`)

    const history = await chrome.history.search({ text: '', maxResults: P`max-results` })
    const historyFiltered = history.filter(historyItem => {
      let validations = []

      if (P`title`) validations.push(() => titlePattern.test(historyItem.title))
      if (P`url`) validations.push(() => urlPattern.test(historyItem.url))

      return validations.every(validation => validation())
    })

    const updates = historyFiltered.map(formatHistoryItem)

    command.update(...updates)
  }

  if (P`help`) displayHelp(command)
}
