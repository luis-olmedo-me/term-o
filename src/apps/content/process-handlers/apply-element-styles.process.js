import { styleStringToArray } from '@content/helpers/css-management.helpers'
import { getElementByXPath } from '@content/helpers/dom-management.helpers'
import { highlightElement } from '@content/pure-js'
import { delay } from '@src/helpers/utils.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, newInlineStyles } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')
  const styles = styleStringToArray(newInlineStyles)

  highlightElement(element, data.theme)
  await delay(600)

  styles.forEach(({ prop, value }) => {
    element.style.setProperty(prop, value)
  })

  resolve(styles)
}
