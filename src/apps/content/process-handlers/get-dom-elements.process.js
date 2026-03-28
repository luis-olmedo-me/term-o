import { getElementByXPath, getElementXPath } from '@content/helpers/dom-locator.helpers'

export default async (resolve, _reject, data) => {
  const { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText } = data

  const tagPattern = searchByTag && new RegExp(searchByTag)
  const textPattern = searchByText && new RegExp(searchByText)

  const attributeValidations = searchByAttribute.map(([attrName, attrValue]) => {
    const attrNamePattern = new RegExp(attrName)
    const attrValuePattern = attrValue ? new RegExp(attrValue) : /./g

    return (name, value) => attrNamePattern.test(name) && attrValuePattern.test(value)
  })

  const styleValidations = searchByStyle.map(([styleName, styleValue]) => {
    const styleNamePattern = new RegExp(styleName)
    const styleValuePattern = styleValue ? new RegExp(styleValue) : /./g

    return (name, value) => styleNamePattern.test(name) && styleValuePattern.test(value)
  })

  const hasAttributesValidations = attributeValidations.length > 0
  const hasStyleValidations = styleValidations.length > 0

  const below = searchBelow && getElementByXPath(searchBelow)
  const allElements = (below || window.document).querySelectorAll('*') || []

  const elements = Array.from(allElements).reduce((formattedElements, element) => {
    const tagName = element.tagName.toLowerCase()
    const attrNames = element.getAttributeNames()

    const conditions = []

    if (tagPattern) {
      conditions.push(() => {
        return tagPattern.test(tagName)
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

    if (!conditions.every(condition => condition())) return formattedElements

    const attrs = attrNames.reduce(
      (allAttrs, attrName) => ({ ...allAttrs, [attrName]: element.getAttribute(attrName) }),
      {}
    )

    const xpath = getElementXPath(element)
    const textContent = element.textContent

    return [...formattedElements, { tagName, attributes: attrs, xpath, textContent }]
  }, [])

  resolve(elements)
}
