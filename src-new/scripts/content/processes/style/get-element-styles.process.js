import { getElementByXPath } from '../dom/dom.helpers'
import { findCSSRuleForElement, mockCrossOriginStyleSheets } from './style.helpers'

export const getElementStyles = async (resolve, data) => {
  const { searchByXpath } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve(null)

  const computedStyles = getComputedStyle(element)
  const styles = []

  await mockCrossOriginStyleSheets()

  for (let i = 0; i < computedStyles.length; i++) {
    const propName = computedStyles[i]
    const propValue = computedStyles.getPropertyValue(propName)
    const cssRule = await findCSSRuleForElement(element, propName)

    if (cssRule) styles.push([propName, propValue, cssRule])
  }

  resolve(styles)
}
