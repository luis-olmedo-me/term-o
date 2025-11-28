import { styleStringToArray } from '@content/helpers/css-management.helpers'
import { createHighlight } from '@content/helpers/web-components.helpers'
import { getElementByXPath } from '@src/apps/content/helpers/dom-locator.helpers'
import { delay } from '@src/helpers/utils.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, newInlineStyles } = data

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')
  const styles = styleStringToArray(newInlineStyles)

  createHighlight({ element, theme: data.theme })
  await delay(600)

  styles.forEach(({ prop, value }) => {
    element.style.setProperty(prop, value)
  })

  resolve(styles)
}
