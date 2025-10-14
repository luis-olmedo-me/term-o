import { deleteTabsHistory, getTabsHistory } from '@src/browser-api/history.api'
import { createHelpView } from '@src/helpers/command.helpers'
import { formatHistoryItem } from '@src/helpers/format.helpers'
import { spreadIf } from '@src/helpers/utils.helpers'

export const historyHandler = async command => {
  const P = name => command.props[name]

  if (P`list`) {
    const dateTimeFrom = P`from` ? new Date(P`from`).getTime() : 0
    const dateTimeTo = P`to` && new Date(P`to`).getTime()

    const history = await getTabsHistory({
      startTime: dateTimeFrom,
      maxResults: P`max-results`,
      byTitle: P`title`,
      byUrl: P`url`,
      text: '',
      ...spreadIf(P`to`, { endTime: dateTimeTo })
    })

    const updates = history.map(formatHistoryItem).reverse()

    command.update(...updates)
  }

  if (P`delete`) {
    const dateTimeFrom = new Date(P`from`).getTime()
    const dateTimeTo = new Date(P`to`).getTime()

    const history = await getTabsHistory({
      text: '',
      maxResults: 1000,
      startTime: dateTimeFrom,
      endTime: dateTimeTo
    })

    await deleteTabsHistory({
      startTime: dateTimeFrom,
      endTime: dateTimeTo
    })

    const updates = history.map(formatHistoryItem).reverse()

    command.update(...updates)
  }

  if (P`help`) createHelpView(command)
}
