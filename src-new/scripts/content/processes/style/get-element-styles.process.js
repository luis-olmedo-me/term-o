import { getElementByXPath } from '../dom/dom.helpers'
import {
  clearMockedCrossOriginStyleSheets,
  findCSSRuleForElement,
  mockCrossOriginStyleSheets
} from './style.helpers'

export const getElementStyles = async (resolve, data) => {
  const { searchByXpath, searchByProperty, searchBySelector } = data
  const [searchByPropName, searchByPropValue] = searchByProperty

  const propNamePattern = searchByPropName && new RegExp(searchByPropName)
  const propValuePattern = searchByPropValue && new RegExp(searchByPropValue)
  const selectorPattern = searchBySelector && new RegExp(searchBySelector)

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve(null)

  const computedStyles = getComputedStyle(element)
  let rules = []

  await mockCrossOriginStyleSheets()

  for (let i = 0; i < computedStyles.length; i++) {
    const propName = computedStyles[i]
    const propValue = computedStyles.getPropertyValue(propName)
    const selector = findCSSRuleForElement(element, propName)

    if (!selector) continue
    if (propNamePattern && !propNamePattern.test(propName)) continue
    if (propValuePattern && !propValuePattern.test(propValue)) continue
    if (selectorPattern && !selectorPattern.test(selector)) continue

    const alreadyExistingRule = rules.find(rule => rule.selector === selector)
    const style = [propName, propValue]

    rules = alreadyExistingRule
      ? rules.map(rule =>
          rule.selector === selector ? { selector, styles: [...rule.styles, style] } : rule
        )
      : rules.concat({ selector, styles: [style] })
  }

  const inlineRule = rules.find(rule => rule.selector === 'element.styles')
  const restRules = rules.filter(rule => rule.selector !== 'element.styles')
  const sortedRules = inlineRule ? [inlineRule, ...restRules] : restRules

  clearMockedCrossOriginStyleSheets()
  resolve(sortedRules)
}
