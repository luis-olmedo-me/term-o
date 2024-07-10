import { getColor as C } from '@src/theme/theme.helpers'

export const validate = (dependencies, newProps) => {
  const propNames = Object.keys(newProps)

  for (const propName of propNames) {
    const propDependencies = dependencies[propName]

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

    if (!propDependencies) continue
    const propsCollapsing = propNames.filter(
      name => !propDependencies.includes(name) && propName !== name
    )

    if (propsCollapsing.length) {
      const useless = propsCollapsing.map(name => `${C`brightRed`}--${name}${C`red`}`).join(' or ')

      throw `${C`brightRed`}--${propName}${C`red`} can not work with ${useless}`
    }
  }
}
