import { getDOMElements } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'

function prependCounters(array) {
  const counters = array.reduce((acc, value) => {
    const oldValue = acc[value] || 0

    return { ...acc, [value]: oldValue + 1 }
  }, {})

  return Object.entries(counters).map(([value, count]) => `${count} ${value}`)
}

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
          `${C`#78909c`}[${C`#8c9eff`}${name}${C`#607d8b`}=${C`#ff8f00`}"${value}"${C`#78909c`}]`
      )
      .join(' ')

    return attrs ? `${C`#2979ff`}${tagName} ${attrs}` : `${C`#2979ff`}${tagName}`
  })

  if (P`group`) textElements = prependCounters(textElements)

  command.reset()
  textElements.forEach(element => command.update(element))
}
