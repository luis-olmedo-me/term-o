import { getDOMElements } from '@sidepanel/proccesses/workers'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleSTORAGE = async command => {
  const P = name => command.props[name]

  command.update('Getting elements.', JSON.stringify(localStorage))
}
