export const parseOptions = (index, arg, argsBySpace, propType) => {
  switch (propType) {
    case 'string': {
      index++
      const argStart = argsBySpace.at(index) || ''
      const quote = argStart.charAt(0)

      const isQuote = /"|'/g.test(quote)
      if (!isQuote) return { value: null, newIndex: index }

      index++
      let value = argStart.replace(new RegExp(`^${quote}`), '')
      const nextArgs = argsBySpace.slice(index)

      for (const nextArg of nextArgs) {
        if (nextArg.endsWith(quote)) {
          value += ` ${nextArg.replace(new RegExp(`${quote}$`), '')}`
          index++
          break
        }

        value += ` ${nextArg}`
        index++
      }

      return { value: value || null, newIndex: index }
    }

    case 'boolean': {
      return { value: true, newIndex: index }
    }

    case 'number': {
      const nextArg = argsBySpace.at(++index)
      const value = Number(nextArg)

      return { value: Number.isNaN(value) ? null : value, newIndex: index }
    }

    case 'array': {
      const nextArgs = argsBySpace.slice(index)
      let value = []

      for (const nextArg of nextArgs) {
        if (nextArg.startsWith('--')) break

        value = [...value, nextArg]
        index++
      }

      return { value, newIndex: index }
    }

    default:
      return { value: null, newIndex: index }
  }
}
