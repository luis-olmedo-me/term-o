const conditionPattern = /^\s*([\w]+)\s*==\s*(".*?"|\w+)\s*\?\s*(.*)\s*:\s*(.*)\s*$/

export const createContext = (value, tab) => {
  if (!tab) return value

  const url = tab.url ? new URL(tab.url) : {}

  const replacements = {
    origin: url.origin || '',
    pathname: url.pathname || '',
    host: url.host || '',
    title: tab.title || '',
    tab_id: `T${tab.id || ''}`,
    group_id: `T${tab.groupId || ''}`,
    window_id: `W${tab.windowId || ''}`,
    is_incognito: `${tab.incognito}`
  }

  return value.replace(/{([^}]+)}/g, (match, expression) => {
    const result = conditionPattern.exec(expression)

    if (result) {
      const [, lhs, rhs, trueValue, falseValue] = result

      const lhsValue = replacements[lhs] ?? lhs
      const rhsValue = rhs.replace(/"/g, '').trim()

      const isConditionMatch = lhsValue === rhsValue

      return isConditionMatch
        ? trueValue.replace(/"/g, '').trim()
        : falseValue.replace(/"/g, '').trim()
    }

    return replacements[expression] || match
  })
}
