import { styleStringToArray } from '@content/helpers/css-management.helpers'
import { getElementByXPath } from '@content/helpers/dom-management.helpers'
import { highlightElement } from '../pure-js'

export default async (resolve, reject, data) => {
  const { searchByXpath, newInlineStyles } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')
  const styles = styleStringToArray(newInlineStyles)

  await highlightElement(element, data.theme)

  styles.forEach(({ prop, value }) => {
    element.style.setProperty(prop, value)
  })

  resolve(styles)
}
