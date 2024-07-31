import { clickElement, findDOMElement, getDOMElements } from '@sidepanel/proccesses/workers'
import {
  displayHelp,
  formatDOMEvent,
  formatElement,
  getNumberTabId,
  prependCounters
} from '../handlers.helpers'

export const handleDOM = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  const tabId = P`tab-id` ? getNumberTabId(P`tab-id`) : tab.id

  if (P`search-xpath`) {
    const element = await findDOMElement(tabId, {
      searchByXpath: P`search-xpath`,
      searchBelow: P`below`,
      siblingIndex: P`sibling`,
      parentIndex: P`parent`,
      childIndex: P`child`,
      appendXpath: P`xpath`
    })

    command.reset()
    if (!element) return

    if (!P`click`) {
      const textElement = formatElement({ ...element, tabId: P`tab-id` })
      command.update(textElement)

      return
    }

    const event = await clickElement(tabId, {
      searchByXpath: P`search-xpath`
    })

    const textEvent = formatDOMEvent({ ...event, tabId: P`tab-id` })
    command.update(textEvent)
  }

  if (P`search`) {
    command.update('Getting elements.')
    const elements = await getDOMElements(tabId, {
      searchBelow: P`below`,
      searchByTag: P`tag`,
      searchByAttribute: P`attr`,
      searchByStyle: P`style`,
      searchByText: P`text`,
      appendTextContent: P`content`,
      appendXpath: P`xpath`
    })

    let textElements = elements.map(element => formatElement({ ...element, tabId: P`tab-id` }))
    if (P`group`) textElements = prependCounters(textElements)

    command.reset()
    command.update(...textElements)
  }

  if (P`help`) displayHelp(command)
}
