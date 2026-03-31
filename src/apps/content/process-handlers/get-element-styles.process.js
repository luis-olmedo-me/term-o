import { getElementByXPath } from '@content/helpers/dom-locator.helpers'
import { getNonDefaultComputedStyles } from '@content/helpers/style-utils.helpers'
import { convertElementStylesToJSON } from '@src/helpers/converter.helpers'
import { createHighlight } from '@src/helpers/web-components.helpers'

export default async (resolve, reject, data) => {
  const { searchByXpath, searchByProperty } = data

  const propValidations = searchByProperty.map(([propName, propValue]) => {
    const propNamePattern = new RegExp(propName)
    const propValuePattern = propValue ? new RegExp(propValue) : /./g

    return (name, value) => propNamePattern.test(name) && propValuePattern.test(value)
  })
  const hasPropValidations = propValidations.length > 0

  const element = getElementByXPath(searchByXpath)

  if (!element) return reject('XPath did not match any element.')
  createHighlight({ element, theme: data.theme })

  const styles = getNonDefaultComputedStyles(element).filter(({ prop, value }) => {
    if (hasPropValidations) return propValidations.some(validate => validate(prop, value))

    return true
  })
  const elementAsJSON = convertElementStylesToJSON(element, styles)

  resolve(elementAsJSON)
}
