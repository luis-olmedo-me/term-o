import { getColor as C } from '@src/theme/theme.helpers'

const validatePropDependencies = (propDependencies, propNames, propName) => {
  if (!propDependencies) return

  const propsCollapsing = propNames.filter(
    name => !propDependencies.includes(name) && propName !== name
  )

  if (propsCollapsing.length) {
    const useless = propsCollapsing.map(name => `${C`brightRed`}--${name}${C`red`}`).join(' or ')

    throw `${C`brightRed`}--${propName}${C`red`} can not work with ${useless}`
  }
}

const validateAsDependency = (dependencies, newProps, propName) => {
  const missedDependencyFrom = Object.entries(dependencies).reduce(
    (deps, [dependencyName, dependencyValues]) => {
      return dependencyValues.includes(propName) ? [...deps, dependencyName] : deps
    },
    []
  )
  const missingDependencies = missedDependencyFrom.filter(
    dependency => typeof newProps[dependency] === 'undefined'
  )

  const isValidSkiping = missedDependencyFrom.length - 1 === missingDependencies.length

  if (missingDependencies.length && !isValidSkiping) {
    const matches = missingDependencies
      .map(name => `${C`brightRed`}--${name}${C`red`}`)
      .join(' or ')

    throw `${C`brightRed`}--${propName}${C`red`} requires to be executed with ${matches}.`
  }
}

const validatePropStrictDependencies = (dependencies, newProps, propName) => {
  if (!dependencies) return

  const missingDependencies = dependencies.filter(
    dependency => typeof newProps[dependency] === 'undefined'
  )

  if (missingDependencies.length) {
    const matches = missingDependencies
      .map(name => `${C`brightRed`}--${name}${C`red`}`)
      .join(' and ')

    throw `${C`brightRed`}--${propName}${C`red`} requires to be executed with ${matches}.`
  }
}

export const validate = (dependencies, strictDependencies, newProps) => {
  const propNames = Object.keys(newProps)

  for (const propName of propNames) {
    const propDependencies = dependencies[propName]
    const propStricDependencies = strictDependencies[propName]

    validateAsDependency(dependencies, newProps, propName)
    validatePropStrictDependencies(propStricDependencies, propNames, propName)
    validatePropDependencies(propDependencies, propNames, propName)
  }
}
