import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { styleStringToArray } from '@content/helpers/style-utils.helpers'
import { createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, newInlineStyles } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')
  const styles = styleStringToArray(newInlineStyles)

  const highlight = createHighlight({ element, theme: data.theme })

  highlight.addEventListener('fadingstart', () => {
    styles.forEach(({ prop, value }) => {
      element.style.setProperty(prop, value)
    })
  })

  resolve(styles)
}
