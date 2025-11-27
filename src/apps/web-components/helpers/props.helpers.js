export const getPropsFromAttrs = (element, props) => {
  const attrNames = element.getAttributeNames()
  const propNames = Object.values(props)

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
