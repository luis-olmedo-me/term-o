import { getDOMElements } from '@sidepanel/proccesses/workers'

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
      .map(([name, value]) => `["${name}"="${value}"]`)
      .join(' ')

    return attrs ? `${tagName} ${attrs}` : tagName
  })

  if (P`group`) textElements = prependCounters(textElements)

  command.reset()
  textElements.forEach(element => command.update(element))
}
