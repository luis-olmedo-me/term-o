import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { getNonDefaultComputedStyles } from '@content/helpers/style-utils.helpers'
import { isRgb, rgbToHex } from '@src/helpers/utils.helpers'
import { createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, searchByProperty } = data

  const propValidations = searchByProperty.map(([propName, propValue]) => {
    const propNamePattern = new RegExp(propName)
    const propValuePattern = propValue ? new RegExp(propValue) : /./g

    return (name, value) => propNamePattern.test(name) && propValuePattern.test(value)
  })

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')
  createHighlight({ element, theme: data.theme })

  const styles = getNonDefaultComputedStyles(element).filter(({ prop, value }) =>
    propValidations.some(validate => validate(prop, value))
  )

  const stylesWithHexValues = styles.map(style => {
    const isRgbValue = isRgb(style.value)

    return isRgbValue ? { ...style, value: rgbToHex(style.value) } : style
  })

  resolve(stylesWithHexValues)
}
