import { clickElement, findDOMElement, getDOMElements } from '@sidepanel/proccesses/workers'
import { formatElement, prependCounters } from '../command-handlers.helpers'

export const handleDOM = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`search-xpath`) {
    command.update('Searching element.')
    const element = await findDOMElement(tab.id, {
      searchByXpath: P`search-xpath`
    })

    command.reset()
    if (!element) return

    const textElement = formatElement(element)
    command.update(textElement)

    const event = await clickElement(tab.id, {
      searchByXpath: P`search-xpath`
    })
  }

  if (P`search`) {
    command.update('Getting elements.')
    const elements = await getDOMElements(tab.id, {
      searchByTag: P`tag`,
      searchByAttribute: P`attr`,
      searchByText: P`text`,
      appendXpath: P`xpath`
    })

    let textElements = elements.map(formatElement)
    if (P`group`) textElements = prependCounters(textElements)

    command.reset()
    command.update(...textElements)
  }
}
