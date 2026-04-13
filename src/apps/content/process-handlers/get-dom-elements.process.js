import { convertElementToJSON } from '@src/helpers/converter.helpers'
import { getElementByXPath } from '@src/helpers/dom-locator.helpers'

export default async (resolve, _reject, data) => {
  const { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText } = data

  const textPattern = searchByText && new RegExp(searchByText)

  const attributeValidations = searchByAttribute.map(([attrName, attrValue]) => {
    return (name, value) => name.includes(attrName) && value.includes(attrValue ?? '')
  })

  const styleValidations = searchByStyle.map(([styleName, styleValue]) => {
    return (name, value) => name.includes(styleName) && value.includes(styleValue ?? '')
  })

  const hasAttributesValidations = attributeValidations.length > 0
  const hasStyleValidations = styleValidations.length > 0

  const below = searchBelow && getElementByXPath(searchBelow)
  const allElements = (below || window.document).querySelectorAll('*') || []

  const elements = Array.from(allElements).reduce((formattedElements, element) => {
    const tagName = element.tagName.toLowerCase()
    const attrNames = element.getAttributeNames()

    const conditions = []

    if (searchByTag) {
      conditions.push(() => {
        return tagName.includes(searchByTag)
      })
    }

    if (textPattern) {
      conditions.push(() => {
        return textPattern.test(element.textContent)
      })
    }

    if (hasAttributesValidations) {
      conditions.push(() => {
        return attributeValidations.every(validate => {
          for (const name of attrNames) {
            const value = element.getAttribute(name)
            const isValid = validate(name, value)

            if (isValid) return true
          }

          return false
        })
      })
    }

    if (hasStyleValidations) {
      conditions.push(() => {
        const computedStyles = getComputedStyle(element)

        return styleValidations.every(validate => {
          for (let index = 0; index < computedStyles.length; index++) {
            const propName = computedStyles[index]
            const propValue = computedStyles.getPropertyValue(propName)
            const isValid = validate(propName, propValue)

            if (isValid) return true
          }

          return false
        })
      })
    }

    const isMatch = conditions.every(condition => condition())

    return isMatch ? [...formattedElements, convertElementToJSON(element)] : formattedElements
  }, [])

  resolve(elements)
}
