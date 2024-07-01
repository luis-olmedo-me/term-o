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
      searchByAttributeName: P`attr`
    })

    let textElements = elements.map(({ tagName, attributes }) => {
      const attrs = Object.entries(attributes)
        .map(
          ([name, value]) =>
            `${C`bright-black`}[${C`cyan`}${name}${C`white`}=${C`yellow`}"${value}"${C`bright-black`}]`
        )
        .join(' ')

      return attrs ? `${C`red`}${tagName} ${attrs}` : `${C`red`}${tagName}`
    })

    if (P`group`) textElements = prependCounters(textElements)

    command.reset()
    textElements.forEach(element => command.update(element))
  }
}
