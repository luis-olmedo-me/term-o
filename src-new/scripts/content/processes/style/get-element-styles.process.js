import { getElementByXPath } from '../dom/dom.helpers'

export const getElementStyles = (resolve, data) => {
  const { searchByXpath } = data

  const element = getElementByXPath(searchByXpath)
  console.log('💬  element:', element)

  if (!element) return resolve(null)

  const computedStyles = getComputedStyle(element)

  resolve(computedStyles)
}
