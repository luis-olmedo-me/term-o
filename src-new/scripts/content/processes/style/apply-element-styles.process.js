import { getElementByXPath } from '../dom/dom.helpers'

export const applyElementStyles = async (resolve, data) => {
  const { searchByXpath, newInlineStyles } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve(null)

  element.setAttribute('style', newInlineStyles)

  resolve()
}
