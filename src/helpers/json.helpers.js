const stringify = (value, forbiddenKeys = [], forbiddenValues = []) => {
  const isFunction = typeof value === 'function'
  const isObject = typeof value === 'object' && value !== null && !Array.isArray(value)

  if (isFunction) {
    const functionName = value.name || 'anonymous'

    return `[function.${functionName}]`
  }

  if (isObject) {
    let tempObject = {}

    for (const key in value) {
      let value = value[key]

      if (forbiddenValues.includes(value)) {
        const tracePaths = forbiddenKeys.join('.')
        const trace = tracePaths ? `${tracePaths}.${key}` : key

        throw `The ${trace} reference is being called within an infinite loop.`
      }

      tempObject[key] = stringify(value[key], [...forbiddenKeys, key], [...forbiddenValues, value])
    }

    return tempObject
  }

  return String(value)
}

export const getJSONPathValue = (json, pathExpression) => {
  const paths = pathExpression.split('.')
  let rawValue = json

  for (const key of paths) {
    if (typeof rawValue !== 'object') throw 'Term-O can not inspect inside a non-object value.'

    rawValue = rawValue[key]
  }

  return stringify(rawValue)
}
