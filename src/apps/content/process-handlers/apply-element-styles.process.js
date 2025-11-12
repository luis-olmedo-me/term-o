import { styleStringToArray } from '@content/helpers/css-management.helpers'
import { getElementByXPath } from '@content/helpers/dom-management.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, newInlineStyles } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')

  const styles = styleStringToArray(newInlineStyles)
  if (styles.length) element.setAttribute('style', newInlineStyles)

  resolve([
    {
      selector: 'element.styles',
      styles: styles
    }
  ])
}
