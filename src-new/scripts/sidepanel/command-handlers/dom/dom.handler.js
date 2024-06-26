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
  let elements = await getDOMElements(tab.id, {
    searchByTag: P`tag`,
    searchByAttributeName: P`attr`,
    searchByAttributeValue: P`attr-val`
  })

  if (P`group`) elements = prependCounters(elements)

  command.reset()
  elements.forEach(element => command.update(element))
}
