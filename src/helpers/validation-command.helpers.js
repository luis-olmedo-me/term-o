import {
  groupIdPattern,
  kebabCasePattern,
  tabIdPattern,
  windowIdPattern
} from '@src/constants/patterns.constants'
import { validateSchema } from '@src/helpers/validation-schema.helpers'
import { getArrayAsLine } from './arguments.helpers'
import { getQuotedString } from './utils.helpers'

export const isRegExp = (option, value) => {
  try {
    new RegExp(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid regular expression. Instead, it received "${value}".`
  }
}

export const isDate = (option, value) => {
  const date = new Date(value)

  if (date === 'Invalid Date' || isNaN(date)) {
    const name = option.displayName

    throw `${name} expects a valid Date value. Instead, it received "${value}".`
  }
}

export const isJSON = (option, value) => {
  try {
    JSON.parse(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid JSON. Instead, it received "${value}".`
  }
}

export const isJSONScheme = scheme => {
  return (option, value) => {
    isJSON(option, value)

    const parsedValue = JSON.parse(value)

    validateSchema(option, scheme, parsedValue)
  }
}

export const isKebabCase = (option, value) => {
  if (!kebabCasePattern.test(value)) {
    const name = option.displayName

    throw `${name} expects a valid kebab cased string. Instead, it received "${value}".`
  }
}

export const isWindowId = (option, value) => {
  if (!windowIdPattern.test(value)) {
    const name = option.displayName

    throw `${name} expects a valid window id. Instead, it received "${value}".`
  }
}

export const isTabId = (option, value) => {
  if (!tabIdPattern.test(value)) {
    const name = option.displayName

    throw `${name} expects a valid tab id. Instead, it received "${value}".`
  }
}

export const isGroupId = (option, value) => {
  if (!groupIdPattern.test(value)) {
    const name = option.displayName

    throw `${name} expects a valid group id. Instead, it received "${value}".`
  }
}

export const isURL = (option, value) => {
  try {
    new URL(value)
  } catch (error) {
    const name = option.displayName

    throw `${name} expects a valid URL. Instead, it received "${value}".`
  }
}

export const isAnyOf = validValues => {
  return (option, value) => {
    if (!validValues.includes(value)) {
      const name = option.displayName
      const availableValues = validValues.map(val => `"${val}"`).join(' | ')

      throw `${name} expects one of the following values: ${availableValues}. Instead, it received "${value}".`
    }
  }
}

export const isPositive = (option, value) => {
  if (value <= 0) {
    const name = option.displayName

    throw `${name} expects a positive value. Instead, it received "${value}".`
  }
}

export const isInteger = (option, value) => {
  if (value % 1 !== 0 || isNaN(value)) {
    const name = option.displayName

    throw `${name} expects an integer value. Instead, it received "${value}".`
  }
}

export const isString = (option, value) => {
  if (typeof value !== 'string') {
    const valueValidated = Array.isArray(value) ? getArrayAsLine(value) : value
    const name = option.displayName

    throw `${name} expects an string value. Instead, it received "${valueValidated}".`
  }
}

export const isArray = (option, value) => {
  if (!Array.isArray(value)) {
    const name = option.displayName

    throw `${name} expects an array value. Instead, it received "${value}".`
  }
}

export const isSpaceForbidden = (option, value) => {
  if (value.includes(' ')) {
    const name = option.displayName

    throw `${name} expects a value without space characters. Instead, it received "${value}".`
  }
}

export const hasLength = staticLength => {
  return (option, value) => {
    const isValid = value.length === staticLength

    if (!isValid) {
      const name = option.displayName
      const count = value.length

      throw `${name} expects ${staticLength} value(s). Instead, it received ${count}.`
    }
  }
}

export const hasLengthBetween = (min, max) => {
  return (option, value) => {
    const isValid = value.length >= min && value.length <= max

    if (!isValid) {
      const name = option.displayName
      const count = value.length

      throw `${name} expects between ${min} and ${max} value(s). Instead, it received ${count}.`
    }
  }
}

export const hasItemAs = (index, validation) => {
  return (option, value) => {
    value.forEach((item, itemIndex) => {
      if (itemIndex === index) validation(option, item)
    })
  }
}

export const hasAllItemsAs = (...validations) => {
  return (option, value) => {
    value.forEach(item => {
      validations.forEach(validation => validation(option, item))
    })
  }
}

export const allow = (...dependencies) => {
  return (option, _value, props) => {
    const possibles = dependencies.concat(option.name)
    const uknownDependencies = Object.keys(props).filter(name => !possibles.includes(name))
    const hasUnknownDependencies = uknownDependencies.length > 0

    if (hasUnknownDependencies) {
      const name = option.displayName
      const firstUknownDependency = uknownDependencies.at(0)
      const quotedFirstUknownDependency = getQuotedString(firstUknownDependency)

      throw `${name} can not be executed with ${quotedFirstUknownDependency}.`
    }
  }
}

export const requireAll = (...dependencies) => {
  return (option, _value, props) => {
    const propNames = Object.keys(props)
    const missingDependencies = dependencies.filter(dependency => !propNames.includes(dependency))
    const hasMissingDependencies = missingDependencies.length > 0

    if (hasMissingDependencies) {
      const name = option.displayName
      const firstUknownDependency = missingDependencies.at(0)
      const quotedFirstUknownDependency = getQuotedString(firstUknownDependency)

      throw `${name} must be executed with ${quotedFirstUknownDependency}.`
    }
  }
}

export const requireAnyOf = (...dependencies) => {
  return (option, _value, props) => {
    const propNames = Object.keys(props)
    const possibles = dependencies.concat(option.name)
    const usedRequiredDependencies = possibles.filter(dependency => propNames.includes(dependency))
    const isUsingRequiredOnes = usedRequiredDependencies.length > 1

    if (!isUsingRequiredOnes) {
      const name = option.displayName

      throw `${name} is not expected to be executed within this set of options.`
    }
  }
}

export const conflict = (...dependencies) => {
  return (option, _value, props) => {
    const names = Object.keys(props)
    const conflictingDependencies = dependencies.filter(dependency => names.includes(dependency))
    const hasConflicts = conflictingDependencies.length > 0

    if (hasConflicts) {
      const name = option.displayName
      const firstConflict = conflictingDependencies.at(0)
      const quotedFirstConflict = getQuotedString(firstConflict)

      throw `${name} conflicts with ${quotedFirstConflict}.`
    }
  }
}

export const when = (trigger, validations) => {
  return (option, value, props) => {
    const isTriggered = Object.keys(props).includes(trigger)

    if (isTriggered) {
      validations.forEach(validation => validation(option, value, props))
    }
  }
}

export const requireNoOther = (option, _value, props) => {
  const propNames = Object.keys(props)
  const forbiddenDependencies = propNames.filter(name => name !== option.name)
  const hasForbbidenDependencies = forbiddenDependencies.length > 0

  if (hasForbbidenDependencies) {
    const name = option.displayName
    const firstForbiddenDependency = forbiddenDependencies.at(0)
    const quotedFirstForbiddenDependency = getQuotedString(firstForbiddenDependency)

    throw `${name} can not be executed with ${quotedFirstForbiddenDependency}.`
  }
}

export const value = {
  isRegExp,
  isDate,
  isJSON,
  isJSONScheme,
  isKebabCase,
  isWindowId,
  isTabId,
  isGroupId,
  isURL,
  isAnyOf,
  isPositive,
  isInteger,
  isString,
  isArray,
  isSpaceForbidden
}

export const array = {
  hasLength,
  hasLengthBetween,
  hasItemAs,
  hasAllItemsAs
}

export const options = {
  allow,
  requireAll,
  requireAnyOf,
  requireNoOther,
  conflict,
  when
}
