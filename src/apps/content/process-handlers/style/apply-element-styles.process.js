import { getElementByXPath } from '@content/process-handlers/dom/dom.helpers'
import { styleStringToArray } from './style.helpers'

export const applyElementStyles = async (resolve, data) => {
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
