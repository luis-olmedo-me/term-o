import { findDOMElement, getDOMElements } from '@sidepanel/proccesses/workers'
import { getQuotedString } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'
import { prependCounters } from '../command-handlers.helpers'

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

    const { tagName, attributes } = element

    const attrs = Object.entries(attributes)
      .map(([name, value]) => {
        const attrName = `${C`green`}"${name}"`
        const attrValue = value ? ` ${C`yellow`}"${value}"` : ''

        return `${C`purple`}[${attrName}${attrValue}${C`purple`}]`
      })
      .join(' ')

    const textElement = attrs ? `${C`red`}"${tagName}" ${attrs}` : `${C`red`}"${tagName}"`

    command.update(textElement)
  }

  if (P`search`) {
    command.update('Getting elements.')
    const elements = await getDOMElements(tab.id, {
      searchByTag: P`tag`,
      searchByAttribute: P`attr`,
      searchByText: P`text`,
      appendXpath: P`xpath`
    })

    let textElements = elements.map(({ tagName, attributes, xpath }) => {
      if (xpath !== null) return `${C`yellow`}"${getQuotedString(xpath)}"`

      const attrs = Object.entries(attributes)
        .map(([name, value]) => {
          const attrName = `${C`green`}${getQuotedString(name)}`
          const attrValue = value ? ` ${C`yellow`}${getQuotedString(value)}` : ''

          return `${C`purple`}[${attrName}${attrValue}${C`purple`}]`
        })
        .join(' ')

      return attrs ? `${C`red`}"${tagName}" ${attrs}` : `${C`red`}"${tagName}"`
    })

    if (P`group`) textElements = prependCounters(textElements)

    command.reset()
    command.update(...textElements)
  }
}
