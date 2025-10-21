import { getNonDefaultComputedStyles } from '@content/helpers/css-management.helpers'
import { getElementByXPath } from '@content/helpers/dom-management.helpers'
import { isRgb, rgbToHex } from '@src/helpers/utils.helpers'

export default async (resolve, data) => {
  const { searchByXpath, searchByProperty } = data
  const [searchByPropName, searchByPropValue] = searchByProperty

  const propNamePattern = searchByPropName && new RegExp(searchByPropName)
  const propValuePattern = searchByPropValue && new RegExp(searchByPropValue)

  const element = getElementByXPath(searchByXpath)

  if (!element) return resolve([])

  const styles = getNonDefaultComputedStyles(element).filter(({ prop, value }) => {
    if (propNamePattern) return propNamePattern.test(prop)
    if (propValuePattern) return propValuePattern.test(value)

    return true
  })
  const stylesWithHexValues = styles.map(style => {
    const isRgbValue = isRgb(style.value)

    return isRgbValue ? { ...style, value: rgbToHex(style.value) } : style
  })

  resolve(stylesWithHexValues)
}
