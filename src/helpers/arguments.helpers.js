export const getArgs = value => {
  const fragments = value.split(' ')

  let output = []
  const addFragment = (...fragment) => {
    output = output.concat(...fragment)
  }

  for (let index = 0; index < fragments.length; index++) {
    const fragment = fragments[index]

    if (!fragment) continue

    const startsWithQuote = /^"|^'/g.test(fragment)
    const startsWithBracket = /^\[/g.test(fragment)
    const isFlag = /^-([a-zA-Z]+)/g.test(fragment)

    if (startsWithBracket) {
      const startBrancket = '['
      const endBrancket = ']'
      const endsWithQuote = fragment.endsWith(endBrancket)

      if (endsWithQuote && fragment.length > 1) {
        addFragment(fragment)
        continue
      }

      const nextFragments = fragments.slice(++index)
      let fragmentValue = fragment
      let ignoredEndBrackets = 0

      for (const nextFragment of nextFragments) {
        fragmentValue += ` ${nextFragment}`

        if (nextFragment.startsWith(startBrancket)) ++ignoredEndBrackets
        if (nextFragment.endsWith(endBrancket) && !ignoredEndBrackets) break
        if (nextFragment.endsWith(endBrancket) && ignoredEndBrackets) --ignoredEndBrackets

        index++
      }

      addFragment(fragmentValue)
      continue
    }

    if (startsWithQuote) {
      const quote = fragment.charAt(0)
      const endsWithQuote = fragment.endsWith(quote)

      if (endsWithQuote && fragment.length > 1) {
        addFragment(fragment)
        continue
      }

      const nextFragments = fragments.slice(++index)
      let fragmentValue = fragment

      for (const nextFragment of nextFragments) {
        fragmentValue += ` ${nextFragment}`

        if (nextFragment.endsWith(quote)) break

        index++
      }

      addFragment(fragmentValue)
      continue
    }
    if (isFlag) {
      const flags = fragment
        .replace('-', '')
        .split('')
        .map(flag => `-${flag}`)

      addFragment(...flags)
      continue
    }

    addFragment(fragment)
  }

  return output
}

export const splitBy = (value, key) => {
  const fragments = getArgs(value)

  let output = []
  let outputIndex = 0
  const addFragment = fragment => {
    const carried = output[outputIndex]

    output[outputIndex] = carried ? `${carried} ${fragment}` : fragment
  }

  for (let index = 0; index < fragments.length; index++) {
    const fragment = fragments[index]
    const isKey = fragment === key

    if (isKey) {
      outputIndex++
      continue
    }

    addFragment(fragment)
  }

  return output
}

export const getArray = value => {
  const items = value.slice(1).slice(0, -1)
  const itemsAsArgs = getArgs(items)

  return itemsAsArgs.map(item => {
    return /^"|^'/.test(item) ? item.slice(1).slice(0, -1) : ''
  })
}
