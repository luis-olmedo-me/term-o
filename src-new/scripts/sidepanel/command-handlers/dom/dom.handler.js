import { getDOMElements } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'
import { prependCounters } from '../command-handlers.helpers'

export const handleDOM = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  command.update('Getting elements.')
  const elements = await getDOMElements(tab.id, {
    searchByTag: P`tag`,
    searchByAttributeName: P`attr`
  })

  let textElements = elements.map(({ tagName, attributes }) => {
    const attrs = Object.entries(attributes)
      .map(
        ([name, value]) =>
          `${C`#a0a5ae`}[${C`#26c6da`}${name}${C`#eeeeee`}=${C`#ffd76d`}"${value}"${C`#a0a5ae`}]`
      )
      .join(' ')

    return attrs ? `${C`#ef5350`}${tagName} ${attrs}` : `${C`#ef5350`}${tagName}`
  })

  if (P`group`) textElements = prependCounters(textElements)

  command.reset()
  textElements.forEach(element => command.update(element))
}
