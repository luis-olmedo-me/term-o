import { getElementByXPath } from '../dom/dom.helpers'

export const getElementStyles = (resolve, data) => {
  const { searchByXpath } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve(null)

  const computedStyles = getComputedStyle(element)
  const styles = []

  for (let i = 0; i < computedStyles.length; i++) {
    const propName = computedStyles[i]
    const propValue = computedStyles.getPropertyValue(propName)

    styles.push([propName, propValue])
  }

  resolve(styles)
}
