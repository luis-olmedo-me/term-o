import { styleStringToArray } from '@content/helpers/css-management.helpers'
import { getElementByXPath } from '@content/helpers/dom-management.helpers'

export default async (resolve, data) => {
  const { searchByXpath, newInlineStyles } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve([])

  const styles = styleStringToArray(newInlineStyles)
  if (styles.length) element.setAttribute('style', newInlineStyles)

  resolve([
    {
      selector: 'element.styles',
      styles: styles
    }
  ])
}
