import { applyElementStyles, getElementStyles } from '@sidepanel/proccesses/workers'
import { getQuotedString } from '@src/helpers/utils.helpers'
import { getColor as C } from '@src/theme/theme.helpers'

export const handleSTYLES = async command => {
  const { tab } = command.data
  const P = name => command.props[name]

  if (P`list`) {
    command.update('Searching element styles.')
    const rules = await getElementStyles(tab.id, {
      searchByXpath: P`on`,
      searchByProperty: P`property`,
      searchBySelector: P`selector`
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

  if (P`apply`) {
    await applyElementStyles(tab.id, {
      searchByXpath: P`on`,
      newInlineStyles: P`apply`
    })

    command.update('Searching element styles.')
    const rules = await getElementStyles(tab.id, {
      searchByXpath: P`on`,
      searchByProperty: P`property`,
      searchBySelector: P`selector`
    })

    const filteredRules = rules.filter(rule => rule.selector === 'element.styles')

    const formattedStyles = filteredRules.map(({ styles, selector }) => {
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
