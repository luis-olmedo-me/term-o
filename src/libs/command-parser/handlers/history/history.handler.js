import { createHelpView } from '@src/helpers/command.helpers'
import { formatHistoryItem } from '../handlers.helpers'

export const handleHistory = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const titlePattern = P`title` && new RegExp(P`title`)
    const urlPattern = P`url` && new RegExp(P`url`)
    const dateTimeFrom = P`from` ? new Date(P`from`).getTime() : 0
    const dateTimeTo = P`to` && new Date(P`to`).getTime()

    const history = await chrome.history.search({
      text: '',
      maxResults: P`max-results`,
      startTime: dateTimeFrom,
      ...(P`to` ? { endTime: dateTimeTo } : {})
    })

    const historyFiltered = history.filter(historyItem => {
      let validations = []

      if (P`title`) validations.push(() => titlePattern.test(historyItem.title))
      if (P`url`) validations.push(() => urlPattern.test(historyItem.url))

      return validations.every(validation => validation())
    })

    const updates = historyFiltered.map(formatHistoryItem).reverse()

    command.update(...updates)
  }

  if (P`delete`) {
    const dateTimeFrom = new Date(P`from`).getTime()
    const dateTimeTo = new Date(P`to`).getTime()

    const history = await chrome.history.search({
      text: '',
      maxResults: 1000,
      startTime: dateTimeFrom,
      endTime: dateTimeTo
    })

    await chrome.history.deleteRange({
      startTime: dateTimeFrom,
      endTime: dateTimeTo
    })

    const updates = history.map(formatHistoryItem).reverse()

    command.update(...updates)
  }

  if (P`help`) createHelpView(command)
}
