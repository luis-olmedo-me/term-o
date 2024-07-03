export const splitBy = (value, key) => {
  const fragments = value.trim().split(' ')

  let output = []
  let outputIndex = 0
  const addFragment = fragment => {
    const carried = output[outputIndex]

    output[outputIndex] = carried ? `${carried} ${fragment}` : fragment
  }

  for (let index = 0; index < fragments.length; index++) {
    const fragment = fragments[index]

    const startsWithQuote = /^"|^'/g.test(fragment)
    const isKey = fragment === key

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
        index++
        if (nextFragment.endsWith(quote)) break
      }

      addFragment(fragmentValue)
      continue
    }

    if (isKey) {
      outputIndex++
      continue
    }

    addFragment(fragment)
  }

  return output
}
