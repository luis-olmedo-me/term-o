import { getDOMElements } from '@sidepanel/proccesses/workers'

export const handleDOM = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  command.update('Getting elements.')
  const elements = await getDOMElements(tab.id, {
    searchByTag: P`tag`,
    searchByAttributeName: P`attr`,
    searchByAttributeValue: P`attr-val`
  })

  command.reset()
  elements.forEach(element => command.update(element))
  command.update(`Found ${elements.length} elements.`)
}
