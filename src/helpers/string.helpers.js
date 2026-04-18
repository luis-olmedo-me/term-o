export const toTitleCase = value => {
  return value.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}

export const insert = (value, index, insertion) => {
  return `${value.slice(0, index)}${insertion}${value.slice(index)}`
}

export const isQuoted = value => {
  const isDoubleQuoted = value.startsWith('"') && value.endsWith('"')
  const isSingleQuoted = value.startsWith("'") && value.endsWith("'")

  return isDoubleQuoted || isSingleQuoted
}

export const isArray = value => {
  return value.startsWith('[') && value.endsWith(']')
}

export const fillTemplate = (template, variables) => {
  return Object.entries(variables).reduce((output, [key, value]) => {
    return output.replaceAll(`{${key}}`, value)
  }, template)
}
