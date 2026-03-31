import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { createHighlight } from '@src/helpers/web-components.helpers'
import { convertElementStylesToJSON } from '../helpers/format.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, styles } = data

  const element = getElementByXPath(searchByXpath)
  const stylesToApply = styles.map(([prop, value]) => ({ prop, value }))

  if (!element) return reject('XPath did not match any element.')

  const highlight = createHighlight({ element, theme: data.theme })

  highlight.addEventListener('fadingstart', () => {
    stylesToApply.forEach(({ prop, value }) => element.style.setProperty(prop, value))
  })

  const elementAsJSON = convertElementStylesToJSON(element, stylesToApply)

  resolve(elementAsJSON)
}
