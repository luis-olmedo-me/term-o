import { getElementStyles } from '@sidepanel/proccesses/workers'
import { getQuotedString } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleSTYLES = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`on`) {
    command.update('Searching element styles.')
    const rules = await getElementStyles(tab.id, {
      searchByXpath: P`on`,
      searchByProperty: P`property`
    })

    const formattedStyles = rules.map(({ styles, selector }) => {
      const quotedSelector = getQuotedString(selector)
      const css = styles
        .map(([name, value]) => {
          const coloredName = `${C`green`}${getQuotedString(name)}`
          const coloredValue = value ? ` ${C`yellow`}${getQuotedString(value)}` : ''

          return `${C`purple`}[${coloredName}${coloredValue}${C`purple`}]`
        })
        .join(' ')

      return css ? `${C`cyan`}${quotedSelector} ${css}` : `${C`cyan`}${quotedSelector}`
    })

    command.reset()
    command.update(...formattedStyles)
  }
}
