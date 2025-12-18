import { getQuotedString } from '@src/helpers/utils.helpers'

export const getPropsFromAttrs = (element, propNames) => {
  const attrNames = element.getAttributeNames()

  if (attrNames.length !== propNames.length)
    throw '[TERM-O]: The count of attributes does not match with the expected props count.'

  return propNames.reduce((propsFromAttrs, propName) => {
    const attrValue = element.getAttribute(propName)

    if (attrValue === null) throw `[TERM-O]: The attribute ${propName} is missing.`
    element.removeAttribute(propName)

    return {
      ...propsFromAttrs,
      [propName]: attrValue
    }
  }, {})
}

export const applyCssVariables = (css, props) => {
  Object.entries(props).forEach(([propName, propValue]) => {
    const isPrimitive = propValue.startsWith('#') || propValue.endsWith('px')
    const value = isPrimitive ? propValue : getQuotedString(propValue)

    css = css.replaceAll(`var(--${propName})`, value)
  })

  return css
}

export const applyCssVariablesFromTheme = (css, props, pre = null) => {
  Object.entries(props).forEach(([propName, propValue]) => {
    const name = pre ? `${pre}-${propName}` : propName
    const validValue = `${propValue}`

    if (typeof propValue === 'object') {
      css = applyCssVariablesFromTheme(css, propValue, name)
      return
    }

    const isPrimitive = validValue.startsWith('#') || validValue.endsWith('px')
    const value = isPrimitive ? validValue : getQuotedString(validValue)

    css = css.replaceAll(`var(--${name})`, value)
  })

  return css
}
