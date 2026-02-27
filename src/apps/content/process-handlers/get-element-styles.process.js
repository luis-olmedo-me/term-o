import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { getNonDefaultComputedStyles } from '@content/helpers/style-utils.helpers'
import { isRgb, rgbToHex } from '@src/helpers/utils.helpers'
import { createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, searchByProperty } = data
  const [searchByPropName, searchByPropValue] = searchByProperty

  const propNamePattern = searchByPropName ? new RegExp(searchByPropName) : /./g
  const propValuePattern = searchByPropValue ? new RegExp(searchByPropValue) : /./g

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')
  createHighlight({ element, theme: data.theme })

  const styles = getNonDefaultComputedStyles(element).filter(
    ({ prop, value }) => propNamePattern.test(prop) && propValuePattern.test(value)
  )

  const stylesWithHexValues = styles.map(style => {
    const isRgbValue = isRgb(style.value)

    return isRgbValue ? { ...style, value: rgbToHex(style.value) } : style
  })

  resolve(stylesWithHexValues)
}
