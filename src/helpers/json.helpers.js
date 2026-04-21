import { getQuotedString } from './utils.helpers'

const evalIsObject = value => typeof value === 'object' && value !== null && !Array.isArray(value)

const stringify = (value, forbiddenKeys = [], forbiddenValues = []) => {
  const isObject = evalIsObject(value)

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
  let result = json
  let carriedKeys = []

  for (const key of paths) {
    carriedKeys = carriedKeys.concat(key)

    try {
      result = result[key]
    } catch {
      const errorPath = carriedKeys.join('.')
      const errorResult = stringify(result)
      const quotedErrorPath = getQuotedString(errorPath)
      const quotedErrorResult = getQuotedString(errorResult)

      throw `Term-O can not inspect ${quotedErrorPath} from ${quotedErrorResult} value.`
    }
  }

  return stringify(result)
}
