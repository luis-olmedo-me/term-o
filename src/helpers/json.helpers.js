const stringify = (value, forbiddenKeys = [], forbiddenValues = []) => {
  if (typeof value === 'function') {
    const functionName = value.name || 'anonymous'

    return '[function.' + functionName + ']'
  }

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    let tempObject = {}

    for (const key in value) {
      let value = value[key]

      if (forbiddenValues.includes(value)) {
        const tracePaths = forbiddenKeys.join('.')
        const trace = tracePaths ? tracePaths + '.' + key : key

        throw new Error('The "' + trace + '" reference is being called within an infinite loop.')
      }

      tempObject[key] = stringify(value[key], [...forbiddenKeys, key], [...forbiddenValues, value])
    }

    return tempObject
  }

  return value
}

export const getJSONPathValue = (json, pathExpression) => {
  const paths = pathExpression.split('.')
  let rawValue = json

  for (const key of paths) {
    if (typeof rawValue !== 'object') throw 'Term-O can not inspect inside an undefined value.'

    rawValue = rawValue?.[key]
  }

  return typeof rawValue === 'undefined' ? 'null' : stringify(rawValue)
}
