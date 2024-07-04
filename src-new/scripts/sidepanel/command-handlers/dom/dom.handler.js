import { getDOMElements } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'
import { prependCounters } from '../command-handlers.helpers'

export const handleDOM = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`search`) {
    command.update('Getting elements.')
    const elements = await getDOMElements(tab.id, {
      searchByTag: P`tag`,
      searchByAttribute: P`attr`,
      searchByText: P`text`,
      appendXpath: P`xpath`
    })

    let textElements = elements.map(({ tagName, attributes, xpath }) => {
      if (xpath !== null) return `${C`yellow`}"${xpath}"`

      const attrs = Object.entries(attributes)
        .map(([name, value]) => {
          const attrName = `${C`cyan`}"${name}"`
          const attrValue = value ? ` ${C`yellow`}"${value}"` : ''

          return `${C`purple`}[ ${attrName} ${attrValue} ${C`purple`}]`
        })
        .join(' ')

      return attrs ? `${C`red`}"${tagName}" ${attrs}` : `${C`red`}"${tagName}"`
    })

    if (P`group`) textElements = prependCounters(textElements)

    command.reset()
    textElements.forEach(element => command.update(element))
  }
}
